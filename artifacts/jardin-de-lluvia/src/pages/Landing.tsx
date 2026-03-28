import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";

function RainAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const dropCount = 50;
    for (let i = 0; i < dropCount; i++) {
      const drop = document.createElement("div");
      drop.style.cssText = `
        position: absolute;
        background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(173,216,230,0.6) 50%, rgba(255,255,255,0.8) 100%);
        width: 2px;
        height: 80px;
        top: -100px;
        left: ${Math.random() * 100}vw;
        opacity: ${Math.random() * 0.6 + 0.2};
        animation: rainFall ${Math.random() * 0.8 + 0.4}s linear ${Math.random() * 3}s infinite;
      `;
      container.appendChild(drop);
    }

    const timer = setTimeout(() => {
      container.style.opacity = "0";
      container.style.transition = "opacity 1s ease-out";
      setTimeout(() => {
        if (container) {
          container.innerHTML = "";
          container.style.display = "none";
        }
      }, 1000);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 10,
      }}
    />
  );
}

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Landing() {
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      style={{
        backgroundColor: "#f4f7f6",
        color: "#333",
        lineHeight: 1.6,
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        overflowX: "hidden",
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      <style>{`
        @keyframes rainFall {
          to { transform: translateY(115vh); }
        }
        .feature-card:hover {
          transform: translateY(-10px);
          background: rgba(255,255,255,0.85) !important;
        }
        .btn-primary-hero:hover {
          transform: scale(1.05) translateY(-2px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.35) !important;
          background-color: #f0fdf4 !important;
        }
        .btn-app:hover {
          transform: scale(1.05) translateY(-2px);
          box-shadow: 0 12px 30px rgba(74,222,128,0.4) !important;
        }
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #f4f7f6; }
        ::-webkit-scrollbar-thumb { background: #99cc99; border-radius: 5px; }
        footer a:hover { border-bottom: 1px solid #4ade80 !important; }
      `}</style>

      <RainAnimation />

      {/* --- HERO --- */}
      <header
        style={{
          height: "100vh",
          background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://proyectopuente.com.mx/wp-content/uploads/2021/06/areas-verdes-100.jpg') no-repeat center center`,
          backgroundSize: "cover",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "20px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            content: '""',
            position: "absolute",
            bottom: "-50px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "120%",
            height: "100px",
            background: "#f4f7f6",
            borderRadius: "50% 50% 0 0",
            zIndex: 5,
          }}
        />
        <div style={{ position: "relative", zIndex: 20 }}>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{
              fontSize: "clamp(3rem, 8vw, 5rem)",
              color: "#fff",
              marginBottom: "0.2rem",
              letterSpacing: "-1px",
              textShadow: "0 4px 10px rgba(0,0,0,0.4)",
              fontWeight: 800,
            }}
          >
            Parques de Lluvia
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              fontWeight: 600,
              color: "#fdfd96",
              fontSize: "1.2rem",
              textTransform: "uppercase",
              letterSpacing: "2px",
              marginBottom: "1.5rem",
              textShadow: "0 2px 4px rgba(0,0,0,0.4)",
            }}
          >
            El desierto que respira frescura
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{
              fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
              maxWidth: "700px",
              margin: "0 auto 2rem",
              color: "#fff",
              textShadow: "0 2px 4px rgba(0,0,0,0.4)",
            }}
          >
            Transformamos el calor extremo de Hermosillo en microclimas sostenibles mediante tecnología de riego inteligente y acuíferos confinados.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginBottom: "60px" }}
          >
            <a
              href="#contacto"
              onClick={scrollToContact}
              className="btn-primary-hero"
              style={{
                backgroundColor: "#fff",
                color: "#1e3a20",
                padding: "18px 32px",
                borderRadius: "50px",
                textDecoration: "none",
                fontWeight: "bold",
                display: "inline-block",
                transition: "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease",
                boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
                position: "relative",
                zIndex: 30,
              }}
            >
              Adquirir información sobre servicio y producto
            </a>
            <Link
              href="/app"
              className="btn-app"
              style={{
                backgroundColor: "#4ade80",
                color: "#1e3a20",
                padding: "18px 32px",
                borderRadius: "50px",
                textDecoration: "none",
                fontWeight: "bold",
                display: "inline-block",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                boxShadow: "0 8px 25px rgba(74,222,128,0.3)",
                position: "relative",
                zIndex: 30,
              }}
            >
              🌿 Abrir Calculadora de Análisis
            </Link>
          </motion.div>
        </div>
      </header>

      {/* --- FEATURES --- */}
      <section
        style={{
          padding: "100px 20px",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "25px",
          width: "100%",
        }}
      >
        {[
          {
            icon: "🌵",
            title: "La Problemática",
            text: "Hermosillo enfrenta temperaturas récord. El abandono de espacios recreativos por el calor extremo degrada el tejido social. Necesitamos potenciar el uso de nuestras áreas verdes incluso en verano.",
          },
          {
            icon: "💧",
            title: "La Solución",
            text: "Generamos microclimas mediante un sistema de riego optimizado con acuíferos confinados. Una IA aprende las necesidades hídricas de árboles nativos, maximizando la sombra y la humedad relativa.",
          },
          {
            icon: "✨",
            title: "El Futuro",
            text: "Tras la implementación, los ciudadanos recuperan sus parques. Reducción de hasta 8°C en la temperatura local, menor consumo de agua y un ecosistema urbano resiliente y fresco.",
          },
          {
            icon: "🌐",
            title: "Nuestra Red",
            text: "Conectamos espacios públicos y privados en una red inteligente de enfriamiento urbano. Cada \"Parque de Lluvia\" contribuye a un corredor biológico que reduce el efecto de isla de calor en toda la ciudad.",
          },
        ].map((card, i) => (
          <RevealSection key={i}>
            <div
              className="feature-card"
              style={{
                background: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.3)",
                padding: "35px",
                borderRadius: "24px",
                boxShadow: "0 8px 32px rgba(31,38,135,0.07)",
                transition: "transform 0.3s ease, background 0.3s ease",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <span style={{ fontSize: "2.2rem", marginBottom: "15px", display: "block" }}>{card.icon}</span>
              <h3 style={{ color: "#3a5a40", marginBottom: "15px", fontSize: "1.4rem" }}>{card.title}</h3>
              <p style={{ color: "#555", flex: 1 }}>{card.text}</p>
            </div>
          </RevealSection>
        ))}
      </section>

      {/* --- HOW IT WORKS --- */}
      <RevealSection>
        <section
          style={{
            padding: "100px 20px",
            backgroundColor: "rgba(235,245,235,0.8)",
            textAlign: "center",
            backdropFilter: "blur(5px)",
          }}
        >
          <h2 style={{ fontSize: "2.5rem", color: "#3a5a40", marginBottom: "50px", fontWeight: 700 }}>
            ¿Cómo funciona?
          </h2>
          <div
            style={{
              maxWidth: "1000px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: "30px",
              textAlign: "left",
            }}
          >
            {[
              {
                n: 1,
                title: "Captación y Confinamiento:",
                text: "El sistema utiliza acuíferos confinados diseñados para almacenar agua a bajas temperaturas bajo el suelo, protegida de la evaporación solar extrema de Sonora.",
              },
              {
                n: 2,
                title: "Monitoreo Inteligente:",
                text: "Sensores de humedad y temperatura instalados en la raíz de la vegetación nativa envían datos en tiempo real a una unidad central de procesamiento.",
              },
              {
                n: 3,
                title: "Riego de Precisión:",
                text: "La IA analiza el ciclo de vida de cada árbol y activa el riego optimizado durante las horas de menor radiación, creando un bulbo húmedo que refresca el aire circundante.",
              },
              {
                n: 4,
                title: "Generación de Microclima:",
                text: "A través de la evapotranspiración controlada de especies como el Palo Verde, el espacio reduce su temperatura, volviéndose apto para el uso recreativo continuo.",
              },
            ].map((step) => (
              <div
                key={step.n}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "20px",
                  backgroundColor: "#fff",
                  padding: "30px",
                  borderRadius: "20px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.03)",
                }}
              >
                <div
                  style={{
                    background: "#4ade80",
                    color: "#1e3a20",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    flexShrink: 0,
                  }}
                >
                  {step.n}
                </div>
                <div>
                  <strong style={{ color: "#3a5a40" }}>{step.title}</strong>{" "}
                  <span style={{ color: "#555" }}>{step.text}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </RevealSection>

      {/* --- ENGINEERING --- */}
      <section style={{ padding: "80px 20px", backgroundColor: "#fff" }}>
        <RevealSection>
          <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "2.5rem", color: "#3a5a40", marginBottom: "30px", fontWeight: 700 }}>
              Ingeniería del Frescor
            </h2>
            <p style={{ color: "#555", fontSize: "1.1rem" }}>
              Nuestro producto no es solo riego; es un sistema de gestión térmica urbana diseñado específicamente para el desierto de Sonora.
            </p>
            <div
              style={{
                textAlign: "left",
                marginTop: "40px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "40px",
              }}
            >
              {[
                {
                  title: "Acuíferos Confinados",
                  text: "Almacenamiento subterráneo que evita la evaporación inmediata, permitiendo una reserva estratégica de agua fría.",
                },
                {
                  title: "Aprendizaje Vegetal",
                  text: "Sensores IoT que monitorean el estrés hídrico de especies como el Palo Verde y Mezquite para regar solo lo necesario.",
                },
                {
                  title: "Mitigación de Calor",
                  text: "Diseño de paisaje orientado a la creación de corrientes de aire fresco inducidas por la transpiración arbórea.",
                },
                {
                  title: "Optimización de Recursos",
                  text: "Reducción del 40% en el gasto de agua comparado con sistemas de riego convencionales por aspersión.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    borderLeft: "4px solid #fdfd96",
                    paddingLeft: "20px",
                  }}
                >
                  <h4 style={{ color: "#3a5a40", marginBottom: "10px", fontWeight: 700, fontSize: "1.1rem" }}>
                    {item.title}
                  </h4>
                  <p style={{ color: "#555" }}>{item.text}</p>
                </div>
              ))}
            </div>

            {/* CTA hacia la calculadora */}
            <div style={{ marginTop: "60px" }}>
              <Link
                href="/app"
                style={{
                  display: "inline-block",
                  backgroundColor: "#1e3a20",
                  color: "#fff",
                  padding: "18px 40px",
                  borderRadius: "50px",
                  textDecoration: "none",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  boxShadow: "0 8px 25px rgba(30,58,32,0.3)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
                className="btn-primary-hero"
              >
                🌿 Ir a la Calculadora de Arborización
              </Link>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* --- FOOTER --- */}
      <footer
        id="contacto"
        style={{
          flexShrink: 0,
          backgroundColor: "#1e3a20",
          color: "#fff",
          padding: "60px 20px",
          textAlign: "center",
          position: "relative",
          zIndex: 20,
          marginTop: "auto",
        }}
      >
        <span
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "20px",
            display: "block",
            color: "#4ade80",
          }}
        >
          Parques de Lluvia
        </span>
        <p>Haciendo de Hermosillo una ciudad más habitable.</p>
        <br />
        <p>¿Interesado en implementar esto en tu colonia o desarrollo?</p>
        <br />
        <a
          href="mailto:contacto@parquesdelluvia.hmo"
          style={{
            color: "#4ade80",
            textDecoration: "none",
            fontSize: "1.2rem",
            borderBottom: "1px solid transparent",
            transition: "border 0.3s",
          }}
        >
          contacto@parquesdelluvia.hmo
        </a>
        <div style={{ marginTop: "40px", fontSize: "0.8rem", opacity: 0.7 }}>
          &copy; 2024 Parques de Lluvia – Innovación Climática Hermosillo.
        </div>
      </footer>
    </div>
  );
}
