import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"
import useAppContext from "../hooks/useAppContext"
import { AuthService } from "../main"
import { ColorRing } from "react-loader-spinner"
 
const roles = [
  {
    id: "customer",
    label: "Customer",
    emoji: "🛍️",
    tagline: "Browse · Order · Enjoy",
    description: "Discover restaurants near you and get your favourite meals delivered fast.",
  },
  {
    id: "rider",
    label: "Rider",
    emoji: "🏍️",
    tagline: "Ride · Deliver · Earn",
    description: "Work on your own schedule, pick up deliveries, and earn every single day.",
    perks: ["Flexible hours", "Weekly payouts", "Rider support"],
  },
  {
    id: "seller",
    label: "Seller",
    emoji: "🍳",
    tagline: "Cook · List · Grow",
    description: "Put your restaurant on the map and reach thousands of hungry customers nearby.",
    perks: ["Zero setup fee", "Real-time orders", "Marketing tools"],
  },
]
 
const SelectRole = () => {
  const [selected, setSelected] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const { setUser,user} = useAppContext()
  const navigate = useNavigate()
 
  const handleConfirm = async () => {
    if (!selected || submitting) return
    setSubmitting(true)
    try {
      const token = localStorage.getItem("Quickbite")
      const { data } = await axios.put(
        `${AuthService}/api/auth/addUserRole`,
        { role: selected },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setUser(data.user)
      toast("Welcome to QuickBite! 🎉", {
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      })
      navigate("/", { replace: true })
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Something went wrong")
    } finally {
      setSubmitting(false)
    }
  }
 
  const selectedRole = roles.find((r) => r.id === selected)
 
  return (
    <div
      className="min-h-screen w-full flex"
      style={{ fontFamily: "'Georgia', serif", background: "#0f0a00" }}
    >
      {/* ── Left Panel ── */}
      <div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12"
        style={{
          background: "linear-gradient(145deg, #1a0a00 0%, #2d1200 40%, #1a0800 100%)",
        }}
      >
        {/* Decorative circles */}
        <div style={{
          position: "absolute", top: "-80px", right: "-80px",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,120,0,0.15) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: "100px", left: "-60px",
          width: "300px", height: "300px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,60,0,0.1) 0%, transparent 70%)",
        }} />
 
        {/* Logo */}
        <div style={{ position: "relative", zIndex: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "40px", height: "40px", borderRadius: "12px",
              background: "linear-gradient(135deg, #ff6b00, #ff3d00)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "20px",
            }}>🍔</div>
            <span style={{ color: "#ff6b00", fontSize: "22px", fontWeight: "700", letterSpacing: "1px" }}>
              QuickBite
            </span>
          </div>
        </div>
 
        {/* Hero */}
        <div style={{ position: "relative", zIndex: 10 }}>
          <p style={{
            color: "#ff6b00", fontSize: "13px", letterSpacing: "4px",
            textTransform: "uppercase", marginBottom: "20px",
          }}>
            One last step
          </p>
          <h1 style={{
            color: "#fff8f0", fontSize: "52px", fontWeight: "700",
            lineHeight: "1.15", marginBottom: "24px",
          }}>
            Tell us who<br />
            <span style={{
              background: "linear-gradient(90deg, #ff6b00, #ff3d00)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>you are,</span><br />
            we'll do the rest.
          </h1>
          <p style={{ color: "#a0826a", fontSize: "16px", lineHeight: "1.7", maxWidth: "340px" }}>
            Pick your role and we'll personalise your entire QuickBite experience around you.
          </p>
        </div>
 
        {/* Role badges */}
        <div style={{ position: "relative", zIndex: 10, display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {["🛍️ Customer", "🏍️ Rider", "🍳 Seller"].map((item) => (
            <span key={item} style={{
              background: "rgba(255,107,0,0.12)", border: "1px solid rgba(255,107,0,0.25)",
              color: "#ff9a55", padding: "8px 16px", borderRadius: "999px",
              fontSize: "13px", backdropFilter: "blur(4px)",
            }}>{item}</span>
          ))}
        </div>
      </div>
 
      {/* ── Right Panel ── */}
      <div
        className="w-full lg:w-1/2 flex items-center justify-center p-8"
        style={{ background: "#0f0a00" }}
      >
        <div style={{ width: "100%", maxWidth: "420px" }}>
 
          {/* Mobile logo */}
          <div className="lg:hidden" style={{ textAlign: "left", marginBottom: "40px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "10px",
                background: "linear-gradient(135deg, #ff6b00, #ff3d00)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "18px",
              }}>🍔</div>
              <span style={{ color: "#ff6b00", fontSize: "20px", fontWeight: "700" }}>QuickBite</span>
            </div>
          </div>
 
          {/* Mobile hero */}
          <div className="md:hidden" style={{ position: "relative", zIndex: 10 }}>
            <p style={{ color: "#ff6b00", fontSize: "12px", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "12px" }}>
              One last step
            </p>
            <h1 style={{ color: "#fff8f0", fontSize: "32px", fontWeight: "700", lineHeight: "1.2", marginBottom: "16px" }}>
              Tell us who you are,{" "}
              <span style={{ background: "linear-gradient(90deg, #ff6b00, #ff3d00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                we'll do the rest.
              </span>
            </h1>
          </div>
 
          {/* Mobile badges */}

 
          {/* Heading */}
          <h2 style={{ color: "#fff8f0", fontSize: "30px", fontWeight: "700", marginBottom: "8px" }}>
            Choose your role 👋
          </h2>
          <p style={{ color: "#7a5c4a", fontSize: "15px", marginBottom: "28px" }}>
            Select how you'd like to use QuickBite to get started
          </p>
 
          {/* Role cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
            {roles.map((role) => {
              const isSelected = selected === role.id
              return (
                <div
                  key={role.id}
                  onClick={() => setSelected(role.id)}
                  style={{
                    borderRadius: "14px",
                    border: isSelected
                      ? "1px solid rgba(255,107,0,0.55)"
                      : "1px solid rgba(255,255,255,0.08)",
                    background: isSelected
                      ? "rgba(255,107,0,0.07)"
                      : "rgba(255,255,255,0.02)",
                    padding: "16px 18px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "14px",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.background = "rgba(255,255,255,0.04)"
                    if (!isSelected) e.currentTarget.style.border = "1px solid rgba(255,107,0,0.2)"
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) e.currentTarget.style.background = "rgba(255,255,255,0.02)"
                    if (!isSelected) e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)"
                  }}
                >
                  {/* Emoji box — mirrors Login's logo box style */}
                  <div style={{
                    width: "42px", height: "42px", borderRadius: "12px", flexShrink: 0,
                    background: isSelected
                      ? "linear-gradient(135deg, #ff6b00, #ff3d00)"
                      : "rgba(255,107,0,0.1)",
                    border: isSelected ? "none" : "1px solid rgba(255,107,0,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "20px", transition: "all 0.2s",
                  }}>
                    {role.emoji}
                  </div>
 
                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "3px" }}>
                      <span style={{
                        color: isSelected ? "#ff9a55" : "#fff8f0",
                        fontSize: "16px", fontWeight: "700", transition: "color 0.2s",
                      }}>
                        {role.label}
                      </span>
                      {isSelected && (
                        <span style={{
                          color: "#ff6b00", fontSize: "10px",
                          letterSpacing: "2px", textTransform: "uppercase",
                        }}>
                          Selected ✓
                        </span>
                      )}
                    </div>
 
                    <p style={{
                      color: "#ff6b00", fontSize: "10px", letterSpacing: "3px",
                      textTransform: "uppercase", marginBottom: "7px",
                    }}>
                      {role.tagline}
                    </p>
 
                    <p style={{ color: "#7a5c4a", fontSize: "13px", lineHeight: "1.55", marginBottom: "10px" }}>
                      {role.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
 
          {/* CTA — same height, radius and style as Login's Google button */}
          <button
            onClick={handleConfirm}
            disabled={!selected || submitting}
            style={{
              width: "100%", height: "52px", borderRadius: "14px",
              background: selected
                ? "linear-gradient(135deg, #ff6b00, #ff3d00)"
                : "rgba(255,255,255,0.04)",
              border: selected ? "none" : "1px solid rgba(255,255,255,0.1)",
              color: selected ? "#fff8f0" : "#3a2010",
              fontSize: "15px", fontWeight: "700",
              fontFamily: "'Georgia', serif",
              cursor: selected ? "pointer" : "not-allowed",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "12px",
              transition: "all 0.2s",
              letterSpacing: "0.3px",
            }}
            onMouseEnter={(e) => {
              if (selected && !submitting) e.currentTarget.style.opacity = "0.88"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1"
            }}
          >
            {submitting ? (
              <ColorRing
                visible={true}
                height="36"
                width="36"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#ff6b00", "#ff3d00", "#ff9a55", "#ff6b00", "#ff3d00"]}
              />
            ) : selected ? (
              `Continue as ${selectedRole?.label} →`
            ) : (
              "Select a role to continue"
            )}
          </button>
 
          <p style={{ textAlign: "center", color: "#3a2010", fontSize: "12px", marginTop: "16px" }}>
            You can update your role anytime from account settings
          </p>
        </div>
      </div>
    </div>
  )
}
 
export default SelectRole