import React, { useState, useRef } from 'react';
import ReactFlow, { Background, Controls } from 'react-flow-renderer';

const Home = () => {
    const [nodes, setNodes] = useState([

    ]);
    const [edges, setEdges] = useState([]);
    const yPos = useRef(0);
    const [selectedNode, setSelectedNode] = useState(null);
    const [newNodeName, setNewNodeName] = useState('');

    const handleNodeCreate = () => {
        yPos.current += 50;
        const newNodeId = (nodes.length + 1).toString();
        const newNode = {
            id: newNodeId,
            position: { x: 100, y: yPos.current },
            data: { label: 'New Node' },
        };
        setNodes(prevNodes => [...prevNodes, newNode]);
    };

    const handleConnect = (params) => {
        const newEdgeId = `${params.source}-${params.target}-${Date.now()}`;
        const newEdge = { id: newEdgeId, source: params.source, target: params.target };
        setEdges(prevEdges => [...prevEdges, newEdge]);
    };

    const handleNodeClick = (event, node) => {
        setSelectedNode(node);
    };

    const handleNodeNameChange = (event) => {
        setNewNodeName(event.target.value);
    };

    const handleNodeNameSave = () => {
        if (selectedNode && newNodeName.trim() !== '') {
            const updatedNodes = nodes.map(n => {
                if (n.id === selectedNode.id) {
                    return {
                        ...n,
                        data: { ...n.data, label: newNodeName },
                    };
                }
                return n;
            });
            setNodes(updatedNodes);
            setSelectedNode(null);
            setNewNodeName('');
        }
    };

    const handleNodeDelete = (nodeId) => {
        const updatedNodes = nodes.filter(n => n.id !== nodeId);
        setNodes(updatedNodes);
        const updatedEdges = edges.filter(e => e.source !== nodeId && e.target !== nodeId);
        setEdges(updatedEdges);
    };

    const handleEdgeDelete = (edgeId) => {
        const updatedEdges = edges.filter(e => e.id !== edgeId);
        setEdges(updatedEdges);
    };

    const onNodeDrag = (event, node) => {
        const updatedNodes = nodes.map(n => {
            if (n.id === node.id) {
                return {
                    ...n,
                    position: { x: node.position.x, y: node.position.y },
                };
            }
            return n;
        });
        setNodes(updatedNodes);
    };

    const renderDeleteButtons = () => {
        return nodes.map(node => (
            <button
                key={node.id}
                className='button2 delete-button'
                style={{
                    position: 'absolute',
                    top: node.position.y + 20,
                    left: node.position.x + 150,
                    transform: 'translate(-50%, -50%) ',
                    zIndex: 100
                }}
                onClick={() => handleNodeDelete(node.id)}
            >
                X
            </button>
        ));
    };

    const renderDeleteEdgeButtons = () => {
        return edges.map(edge => (
            <button
                key={edge.id}
                className='button2 delete-edge-button'
                style={{
                    position: 'absolute',
                    top: (nodes.find(node => node.id === edge.source)?.position.y + nodes.find(node => node.id === edge.target)?.position.y) / 2,
                    left: (nodes.find(node => node.id === edge.source)?.position.x + nodes.find(node => node.id === edge.target)?.position.x) / 1.1,
                    transform: 'translate(-50%, -50%) ',
                    zIndex: 100,

                }}
                onClick={() => handleEdgeDelete(edge.id)}
            >
                X
            </button>
        ));
    };

    return (
        <div className="home-container">
            <div className="graph-panel">
                <ReactFlow nodes={nodes} edges={edges}
                    elements={nodes.concat(edges)}
                    onConnect={handleConnect}
                    onNodeClick={handleNodeClick}
                    onNodeDrag={onNodeDrag}
                    zoomOnScroll={true}
                >
                    <Background />
                    <Controls />
                    {renderDeleteButtons()}
                    {renderDeleteEdgeButtons()} { }
                </ReactFlow>
            </div>
            <div className="sidebar">
                <button onClick={handleNodeCreate}>Create Node</button>
                {selectedNode && (
                    <div>
                        <input type="text" value={newNodeName} onChange={handleNodeNameChange} />
                        <button onClick={handleNodeNameSave}>Save Name</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
