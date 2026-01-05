
import React, { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import { PolicyEntry } from '../types';

interface GraphViewProps {
  data: PolicyEntry[];
}

interface Node extends d3.SimulationNodeDatum {
  id: string;
  type: 'objektif' | 'dasar' | 'fasa' | 'skop' | 'perundangan';
  label: string;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string;
  target: string;
}

const GraphView: React.FC<GraphViewProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const graphData = useMemo(() => {
    const nodes: Node[] = [];
    const links: Link[] = [];
    const nodeSet = new Set<string>();

    data.forEach(item => {
      const objId = `obj-${item.id}`;
      if (!nodeSet.has(objId)) {
        nodes.push({ id: objId, type: 'objektif', label: item.objektif.substring(0, 30) + '...' });
        nodeSet.add(objId);
      }

      // Link to Dasar
      item.dasar.forEach(d => {
        if (!nodeSet.has(d)) {
          nodes.push({ id: d, type: 'dasar', label: d });
          nodeSet.add(d);
        }
        links.push({ source: objId, target: d });
      });

      // Link to Fasa
      item.fasa.forEach(f => {
        if (!nodeSet.has(f)) {
          nodes.push({ id: f, type: 'fasa', label: f });
          nodeSet.add(f);
        }
        links.push({ source: objId, target: f });
      });

      // Link to Skop
      item.skop.forEach(s => {
        if (!nodeSet.has(s)) {
          nodes.push({ id: s, type: 'skop', label: s });
          nodeSet.add(s);
        }
        links.push({ source: objId, target: s });
      });
    });

    return { nodes, links };
  }, [data]);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 1000;
    const height = 700;
    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`);
    
    svg.selectAll('*').remove();

    const simulation = d3.forceSimulation<Node>(graphData.nodes)
      .force('link', d3.forceLink<Node, Link>(graphData.links).id(d => d.id).distance(120))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(60));

    const link = svg.append('g')
      .attr('stroke', '#e2e8f0')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(graphData.links)
      .join('line')
      .attr('stroke-width', 1.5);

    const node = svg.append('g')
      .selectAll('g')
      .data(graphData.nodes)
      .join('g')
      .call(d3.drag<SVGGElement, Node>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended) as any);

    const colors = {
      objektif: '#4f46e5', // indigo
      dasar: '#0891b2',   // cyan
      fasa: '#d97706',    // amber
      skop: '#16a34a',    // green
      perundangan: '#dc2626' // red
    };

    node.append('circle')
      .attr('r', d => d.type === 'objektif' ? 20 : 12)
      .attr('fill', d => colors[d.type])
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .attr('class', 'shadow-lg');

    node.append('text')
      .text(d => d.label)
      .attr('x', 15)
      .attr('y', 5)
      .style('font-size', '10px')
      .style('font-weight', 'bold')
      .style('fill', '#475569')
      .style('pointer-events', 'none')
      .attr('class', 'select-none');

    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as any).x)
        .attr('y1', d => (d.source as any).y)
        .attr('x2', d => (d.target as any).x)
        .attr('y2', d => (d.target as any).y);

      node
        .attr('transform', d => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  }, [graphData]);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-inner p-4 relative overflow-hidden h-[750px]">
      <div className="absolute top-6 left-6 z-10 space-y-2 bg-white/80 backdrop-blur p-4 rounded-xl border border-slate-200 shadow-sm">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Petunjuk Hubungan</h4>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
            <span className="w-3 h-3 rounded-full bg-indigo-600"></span> Objektif Kajian
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
            <span className="w-3 h-3 rounded-full bg-cyan-600"></span> Dasar / Roadmap
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
            <span className="w-3 h-3 rounded-full bg-amber-600"></span> Fasa Kajian
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
            <span className="w-3 h-3 rounded-full bg-green-600"></span> Skop Pelaksanaan
          </div>
        </div>
      </div>
      <svg ref={svgRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      <div className="absolute bottom-6 right-6 text-[10px] text-slate-400 font-mono">
        Interaksi: Seret nod untuk melihat dinamik hubungan
      </div>
    </div>
  );
};

export default GraphView;
