"use client"

import type React from "react"

import { useState } from "react"
import { ChevronRight, ChevronDown, Folder, File, FolderOpen } from "lucide-react"
import "./TreeView.scss"

export interface TreeNode {
  id: string
  label: string
  children?: TreeNode[]
  icon?: React.ReactNode
  data?: any
}

export interface TreeViewProps {
  data: TreeNode[]
  onNodeSelect?: (node: TreeNode) => void
  defaultExpandedIds?: string[]
  className?: string
}

export function TreeView({ data, onNodeSelect, defaultExpandedIds = [], className = "" }: TreeViewProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(defaultExpandedIds))
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  const toggleNode = (nodeId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    const newExpandedNodes = new Set(expandedNodes)
    if (newExpandedNodes.has(nodeId)) {
      newExpandedNodes.delete(nodeId)
    } else {
      newExpandedNodes.add(nodeId)
    }
    setExpandedNodes(newExpandedNodes)
  }

  const handleNodeSelect = (node: TreeNode) => {
    setSelectedNode(node.id)
    if (onNodeSelect) {
      onNodeSelect(node)
    }
  }

  const renderTreeNode = (node: TreeNode, level = 0) => {
    const hasChildren = node.children && node.children.length > 0
    const isExpanded = expandedNodes.has(node.id)
    const isSelected = selectedNode === node.id

    return (
      <li key={node.id} className="tree-view__node">
        <div
          className={`tree-view__node-content ${isSelected ? "tree-view__node-content--selected" : ""}`}
          style={{ paddingLeft: `${level * 1.5}rem` }}
          onClick={() => handleNodeSelect(node)}
        >
          {hasChildren ? (
            <button
              className="tree-view__toggle"
              onClick={(e) => toggleNode(node.id, e)}
              aria-label={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
          ) : (
            <span className="tree-view__toggle tree-view__toggle--placeholder"></span>
          )}

          <span className="tree-view__icon">
            {node.icon ||
              (hasChildren ? isExpanded ? <FolderOpen size={18} /> : <Folder size={18} /> : <File size={18} />)}
          </span>

          <span className="tree-view__label">{node.label}</span>
        </div>

        {hasChildren && isExpanded && (
          <ul className="tree-view__children">
            {node.children.map((childNode) => renderTreeNode(childNode, level + 1))}
          </ul>
        )}
      </li>
    )
  }

  return (
    <div className={`tree-view ${className}`}>
      <ul className="tree-view__root">{data.map((node) => renderTreeNode(node))}</ul>
    </div>
  )
}

