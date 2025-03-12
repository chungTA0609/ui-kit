"use client"

import { useState } from "react"
import { ImageLightbox, type ImageItem } from "../ImageLightbox/ImageLightbox"
import { TreeView, type TreeNode } from "../TreeView/TreeView"
import { ChatWidget, type ChatMessage } from "../ChatWidget/ChatWidget"
// import { MapView, type MapLocation } from "../MapView/MapView"
import { DashboardWidgets, type KpiData, type ChartData } from "../DashboardWidgets/DashboardWidgets"
import { Button } from "../../ui/Button/Button"
import { DollarSign, Users, ShoppingCart, TrendingUp } from "lucide-react"
import "./AdvancedComponentsDemo.scss"

export function AdvancedComponentsDemo() {
  const [showLightbox, setShowLightbox] = useState(false)
  const [selectedTreeNode, setSelectedTreeNode] = useState<TreeNode | null>(null)

  // Sample data for ImageLightbox
  const images: ImageItem[] = [
    {
      src: "https://images.unsplash.com/photo-1682687982501-1e58ab814714",
      alt: "Mountain landscape with a lake",
      thumbnail: "https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=100&h=100&fit=crop",
    },
    {
      src: "https://images.unsplash.com/photo-1682687218147-9806132dc697",
      alt: "Coastal sunset with rocks",
      thumbnail: "https://images.unsplash.com/photo-1682687218147-9806132dc697?w=100&h=100&fit=crop",
    },
    {
      src: "https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1",
      alt: "Urban architecture",
      thumbnail: "https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?w=100&h=100&fit=crop",
    },
  ]

  // Sample data for TreeView
  const treeData: TreeNode[] = [
    {
      id: "1",
      label: "Documents",
      children: [
        {
          id: "1-1",
          label: "Work",
          children: [
            { id: "1-1-1", label: "Project A" },
            { id: "1-1-2", label: "Project B" },
          ],
        },
        {
          id: "1-2",
          label: "Personal",
          children: [
            { id: "1-2-1", label: "Finances" },
            { id: "1-2-2", label: "Travel" },
          ],
        },
      ],
    },
    {
      id: "2",
      label: "Pictures",
      children: [
        { id: "2-1", label: "Vacation" },
        { id: "2-2", label: "Family" },
      ],
    },
    { id: "3", label: "Downloads" },
  ]

  // Sample data for ChatWidget
  const chatMessages: ChatMessage[] = [
    {
      id: "1",
      content: "Hello! How can I help you today?",
      sender: "agent",
      timestamp: new Date(Date.now() - 3600000),
      status: "read",
    },
    {
      id: "2",
      content: "I have a question about my order #12345",
      sender: "user",
      timestamp: new Date(Date.now() - 3500000),
      status: "read",
    },
    {
      id: "3",
      content: "Sure, I'd be happy to help with your order. What would you like to know?",
      sender: "agent",
      timestamp: new Date(Date.now() - 3400000),
      status: "read",
    },
    {
      id: "4",
      content: "When will it be delivered?",
      sender: "user",
      timestamp: new Date(Date.now() - 3300000),
      status: "read",
    },
    {
      id: "5",
      content: "Let me check that for you. Your order is scheduled for delivery tomorrow between 9 AM and 12 PM.",
      sender: "agent",
      timestamp: new Date(Date.now() - 3200000),
      status: "read",
    },
    {
      id: "6",
      content: "Great, thank you!",
      sender: "user",
      timestamp: new Date(Date.now() - 3100000),
      status: "delivered",
    },
  ]

  // Sample data for MapView
  // const mapLocations: MapLocation[] = [
  //   {
  //     id: "1",
  //     name: "Central Park",
  //     latitude: 40.785091,
  //     longitude: -73.968285,
  //     description: "Urban park in New York City",
  //   },
  //   {
  //     id: "2",
  //     name: "Empire State Building",
  //     latitude: 40.748817,
  //     longitude: -73.985428,
  //     description: "Iconic skyscraper in Manhattan",
  //   },
  //   {
  //     id: "3",
  //     name: "Times Square",
  //     latitude: 40.758896,
  //     longitude: -73.98513,
  //     description: "Major commercial intersection and entertainment center",
  //   },
  // ]

  // Sample data for DashboardWidgets
  const kpiData: KpiData[] = [
    {
      title: "Total Revenue",
      value: 54621,
      unit: "USD",
      change: 12.5,
      changeType: "positive",
      icon: <DollarSign size={24} />,
      color: "#4154F1",
    },
    {
      title: "New Users",
      value: 3890,
      change: 8.2,
      changeType: "positive",
      icon: <Users size={24} />,
      color: "#00C49F",
    },
    {
      title: "Orders",
      value: 1250,
      change: -2.4,
      changeType: "negative",
      icon: <ShoppingCart size={24} />,
      color: "#FFBB28",
    },
    {
      title: "Conversion Rate",
      value: 3.2,
      unit: "%",
      change: 1.1,
      changeType: "positive",
      icon: <TrendingUp size={24} />,
      color: "#FF8042",
    },
  ]

  const chartData: ChartData[] = [
    {
      type: "bar",
      title: "Monthly Sales",
      data: [
        { name: "Jan", value: 4000 },
        { name: "Feb", value: 3000 },
        { name: "Mar", value: 2000 },
        { name: "Apr", value: 2780 },
        { name: "May", value: 1890 },
        { name: "Jun", value: 2390 },
      ],
      colors: ["#4154F1", "#00C49F"],
    },
    {
      type: "line",
      title: "User Growth",
      data: [
        { name: "Jan", value: 1000, value2: 400 },
        { name: "Feb", value: 1200, value2: 500 },
        { name: "Mar", value: 1500, value2: 600 },
        { name: "Apr", value: 1800, value2: 700 },
        { name: "May", value: 2200, value2: 900 },
        { name: "Jun", value: 2500, value2: 1100 },
      ],
      colors: ["#4154F1", "#FF8042"],
    },
    {
      type: "pie",
      title: "Traffic Sources",
      data: [
        { name: "Direct", value: 400 },
        { name: "Social", value: 300 },
        { name: "Referral", value: 300 },
        { name: "Organic", value: 200 },
      ],
      colors: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"],
    },
  ]

  const handleSendMessage = (message: string) => {
    console.log("Sending message:", message)
    // In a real app, you would add the message to the chat
  }

  // const handleLocationSelect = (location: MapLocation) => {
  //   console.log("Selected location:", location)
  // }

  return (
    <div className="advanced-components-demo">
      <section className="advanced-components-demo__section">
        <h2 className="advanced-components-demo__title">Image Lightbox</h2>
        <div className="advanced-components-demo__content">
          <div className="advanced-components-demo__thumbnails">
            {images.map((image, index) => (
              <div key={index} className="advanced-components-demo__thumbnail-wrapper">
                <img
                  src={image.thumbnail || image.src}
                  alt={image.alt}
                  className="advanced-components-demo__thumbnail"
                  onClick={() => setShowLightbox(true)}
                />
              </div>
            ))}
          </div>
          <Button variant="primary" onClick={() => setShowLightbox(true)}>
            Open Lightbox
          </Button>
          {showLightbox && <ImageLightbox images={images} onClose={() => setShowLightbox(false)} />}
        </div>
      </section>

      <section className="advanced-components-demo__section">
        <h2 className="advanced-components-demo__title">Tree View</h2>
        <div className="advanced-components-demo__content">
          <div className="advanced-components-demo__tree-container">
            <TreeView
              data={treeData}
              onNodeSelect={(node) => setSelectedTreeNode(node)}
              defaultExpandedIds={["1", "1-1"]}
            />
          </div>
          {selectedTreeNode && (
            <div className="advanced-components-demo__tree-info">
              <h3>Selected Node:</h3>
              <p>ID: {selectedTreeNode.id}</p>
              <p>Label: {selectedTreeNode.label}</p>
            </div>
          )}
        </div>
      </section>

      <section className="advanced-components-demo__section">
        <h2 className="advanced-components-demo__title">Chat Widget</h2>
        <div className="advanced-components-demo__content">
          <ChatWidget
            messages={chatMessages}
            onSendMessage={handleSendMessage}
            agentName="Support Agent"
            agentStatus="online"
            agentAvatar="https://randomuser.me/api/portraits/women/44.jpg"
            height="400px"
          />
        </div>
      </section>

      <section className="advanced-components-demo__section">
        <h2 className="advanced-components-demo__title">Map Integration</h2>
        <div className="advanced-components-demo__content">
          {/* <MapView
            locations={mapLocations}
            center={[40.758896, -73.98513]}
            zoom={13}
            height="400px"
            onLocationSelect={handleLocationSelect}
          /> */}
        </div>
      </section>

      <section className="advanced-components-demo__section">
        <h2 className="advanced-components-demo__title">Dashboard Widgets</h2>
        <div className="advanced-components-demo__content">
          <DashboardWidgets kpis={kpiData} charts={chartData} />
        </div>
      </section>
    </div>
  )
}

