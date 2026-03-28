import axios from 'axios'
import { AuthService } from "../main";
import { useGoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast'
import useAppContext from "../hooks/useAppContext";
import { replace, useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';

const Login = () => {
  const {Loading,setLoading,setUser} = useAppContext()
  const navigate = useNavigate()

  const responseGoogle = async (authresult:any)=>{
    setLoading(true);
    try {
        const result = await axios.post(`${AuthService}/api/auth/login`,{code:authresult["code"]})
        localStorage.setItem('Quickbite',result?.data?.token);
        toast(result?.data?.message,{ 
          style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },});
        setUser(result?.data?.user)
        navigate(result?.data?.user?.role ? '/' : '/role', { replace: true });   
    } catch (error) {
        console.log(error);
        setUser(null);
    }
    finally{
      setLoading(false);
    }
  }
  const googleLogin = useGoogleLogin({
    onSuccess:responseGoogle,
    onError:responseGoogle,
    flow:"auth-code"
  })

  return (
    <div className="min-h-screen w-full flex" style={{
      fontFamily: "'Georgia', serif",
      background: "#0f0a00"
    }}>
      {/* Left Panel - Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12" style={{
        background: "linear-gradient(145deg, #1a0a00 0%, #2d1200 40%, #1a0800 100%)"
      }}>
        {/* Decorative circles */}
        <div style={{
          position: "absolute", top: "-80px", right: "-80px",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,120,0,0.15) 0%, transparent 70%)"
        }} />
        <div style={{
          position: "absolute", bottom: "100px", left: "-60px",
          width: "300px", height: "300px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,60,0,0.1) 0%, transparent 70%)"
        }} />

        {/* Logo */}
        <div style={{ position: "relative", zIndex: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "40px", height: "40px", borderRadius: "12px",
              background: "linear-gradient(135deg, #ff6b00, #ff3d00)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "20px"
            }}>🍔</div>
            <span style={{ color: "#ff6b00", fontSize: "22px", fontWeight: "700", letterSpacing: "1px" }}>
              QuickBite
            </span>
          </div>
        </div>

        {/* Center hero text */}
        <div style={{ position: "relative", zIndex: 10 }}>
          <p style={{
            color: "#ff6b00", fontSize: "13px", letterSpacing: "4px",
            textTransform: "uppercase", marginBottom: "20px"
          }}>
            Fresh · Fast · Delicious
          </p>
          <h1 style={{
            color: "#fff8f0", fontSize: "52px", fontWeight: "700",
            lineHeight: "1.15", marginBottom: "24px"
          }}>
            Your favourite<br />
            <span style={{
              background: "linear-gradient(90deg, #ff6b00, #ff3d00)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
            }}>meals,</span><br />
            delivered fast.
          </h1>
          <p style={{ color: "#a0826a", fontSize: "16px", lineHeight: "1.7", maxWidth: "340px" }}>
            Order from hundreds of restaurants near you and get hot food at your door in minutes.
          </p>
        </div>

        {/* Floating food badges */}
        <div style={{ position: "relative", zIndex: 10, display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {["🍕 Pizza", "🍜 Noodles", "🌮 Tacos", "🍣 Sushi", "🍔 Burgers"].map((item) => (
            <span key={item} style={{
              background: "rgba(255,107,0,0.12)", border: "1px solid rgba(255,107,0,0.25)",
              color: "#ff9a55", padding: "8px 16px", borderRadius: "999px",
              fontSize: "13px", backdropFilter: "blur(4px)"
            }}>{item}</span>
          ))}
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8" style={{
        background: "#0f0a00"
      }}>
        <div style={{ width: "100%", maxWidth: "420px" }}>
          {/* Mobile Logo */}
          <div className="lg:hidden" style={{ textAlign: "left", marginBottom: "40px" }}>
            <div style={{
              display: "inline-flex", alignItems: "left", gap: "10px"
            }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "10px",
                background: "linear-gradient(135deg, #ff6b00, #ff3d00)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "18px"
              }}>🍔</div>
              <span style={{ color: "#ff6b00", fontSize: "20px", fontWeight: "700" }}>QuickBite</span>
            </div>
          </div>


          

          <h2 style={{ color: "#fff8f0", fontSize: "30px", fontWeight: "700", marginBottom: "8px" }}>
            Welcome  👋
          </h2>

            <div style={{ position: "relative", zIndex: 10 }} className="md:hidden">
          <p style={{
            color: "#ff6b00", fontSize: "12px", letterSpacing: "4px",
            textTransform: "uppercase", marginBottom: "20px"
          }}>
            Fresh · Fast · Delicious
          </p>
          <h1 style={{
            color: "#fff8f0", fontSize: "35px", fontWeight: "700",
            lineHeight: "1.15", marginBottom: "24px"
          }}>
            Your favourite<br />
            <span style={{
              background: "linear-gradient(90deg, #ff6b00, #ff3d00)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
            }}>meals,</span><br />
            delivered fast.
          </h1>
          <p style={{ color: "#a0826a", fontSize: "16px", lineHeight: "1.7", maxWidth: "340px",marginBottom: "15px" }}>
            Order from hundreds of restaurants near you and get hot food at your door in minutes.
          </p>
        </div>

        <div style={{ position: "relative", zIndex: 10, display: "flex", gap: "5px", flexWrap: "wrap",marginBottom: "15px" }} >
          {["🍕 Pizza", "🍜 Noodles", "🌮 Tacos", "🍣 Sushi", "🍔 Burgers"].map((item) => (
            <span key={item} style={{
              background: "rgba(255,107,0,0.12)", border: "1px solid rgba(255,107,0,0.25)",
              color: "#ff9a55", padding: "4px 8px", borderRadius: "999px",
              fontSize: "8px", backdropFilter: "blur(4px)"
            }} className="md:hidden">{item}</span>
          ))}
        </div>

          <p style={{ color: "#7a5c4a", fontSize: "15px", marginBottom: "36px" }}>
            Sign in to continue ordering your favourites
          </p>

          {/* Google Button */}
          <button style={{
            width: "100%", height: "52px", borderRadius: "14px",
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
            color: "#e0c9b8", fontSize: "14px", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "12px",
            transition: "all 0.2s",
          }}
          onClick={googleLogin}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
          >
            {
              Loading ? <ColorRing
                visible={true}
                height="50"
                width="50"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                /> : 
              <>
              <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg" alt="Google" style={{ width: "6rem", height: "18px" }} />
              Continue with Google
              </>
            }
          </button>

          {/* Divider */}
{/* 
          <p style={{ textAlign: "center", color: "#5a4035", fontSize: "14px", marginTop: "24px" }}>
            New here?{" "}
            <a href="#" style={{ color: "#ff6b00", textDecoration: "none", fontWeight: "600" }}
              onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
            >
              Create an account
            </a>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Login;