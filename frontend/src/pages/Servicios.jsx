import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Code, Server, ShieldCheck, CheckCircle, ArrowRight } from 'lucide-react';

const Servicios = () => {
    const { hash } = useLocation();
    useEffect(() => {
        if (hash) {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [hash]);

    return (
        <div className="bg-white min-h-screen pt-20">

            {/* 1. HERO HEADER */}
            <section className="bg-tenri-900 text-white py-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
                        Soluciones Tecnológicas <span className="text-tenri-300">Integrales</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        No necesitas contratar a tres empresas diferentes. Nosotros diseñamos el software, instalamos las redes y protegemos el recinto.
                    </p>
                </div>
            </section>

            {/* 2. DETALLE DE SERVICIOS */}
            <div className="max-w-7xl mx-auto px-4 py-20 space-y-24">
                <ServiceSection
                    id="desarrollo"
                    title="Desarrollo de Software & Web"
                    desc="Transformamos tus procesos manuales en sistemas digitales eficientes. Desde sitios corporativos hasta ERPs complejos y aplicaciones a medida."
                    icon={<Code size={40} className="text-white" />}
                    color="bg-blue-600"
                    features={[
                        "Sitios Web Corporativos & Landing Pages",
                        "Tiendas E-commerce con WebPay/MercadoPago",
                        "Sistemas de Gestión (ERP/CRM) a medida",
                        "Integración de APIs y Automatización"
                    ]}
                    img="/desarrollo.webp"
                    reverse={false}
                    zoom={false}
                    linkValue="desarrollo"
                />

                <ServiceSection
                    id="redes"
                    title="Redes & Infraestructura IT"
                    desc="La columna vertebral de tu negocio. Diseñamos redes estables, rápidas y seguras para oficinas y galpones industriales."
                    icon={<Server size={40} className="text-white" />}
                    color="bg-purple-600"
                    features={[
                        "Cableado Estructurado Certificado (Cat6/6A)",
                        "Configuración de Routers MikroTik y Load Balancing",
                        "Enlaces Inalámbricos Punto a Punto",
                        "Servidores Locales (Windows Server/Linux)"
                    ]}
                    img="/estructura.webp"
                    reverse={true}
                    zoom={true}
                    linkValue="redes"
                />

                <ServiceSection
                    id="seguridad"
                    title="Seguridad Electrónica (CCTV)"
                    desc="Protege tus activos con tecnología de vigilancia de última generación. Monitoreo remoto desde tu celular 24/7."
                    icon={<ShieldCheck size={40} className="text-white" />}
                    color="bg-emerald-600"
                    features={[
                        "Instalación de Cámaras IP y Análogas (Hikvision/Dahua)",
                        "Configuración de NVR y DVR con acceso remoto",
                        "Controles de Acceso Biométricos",
                        "Mantenimiento preventivo de sistemas existentes"
                    ]}
                    img="/seguridad.webp"
                    reverse={false}
                    zoom={true}
                    linkValue="seguridad"
                />
            </div>
        </div>
    );
};

const ServiceSection = ({ id, title, desc, icon, color, features, img, reverse, zoom, linkValue }) => (
    <div id={id} className={`flex flex-col lg:flex-row gap-12 items-center scroll-mt-32 ${reverse ? 'lg:flex-row-reverse' : ''}`}>
        <div className="flex-1">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${color}`}>
                {icon}
            </div>
            <h2 className="text-3xl font-bold text-tenri-900 mb-4">{title}</h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                {desc}
            </p>
            <ul className="space-y-4">
                {features.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                        <CheckCircle size={20} className="text-tenri-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{item}</span>
                    </li>
                ))}
            </ul>
            <Link to={`/contacto?servicio=${linkValue}`} className="mt-8 inline-flex items-center gap-2 text-tenri-500 font-bold hover:gap-3 transition-all">
                Solicitar este servicio <ArrowRight size={20} />
            </Link>
        </div>
        <div className="flex-1 w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] group">
                <div className={`absolute inset-0 opacity-10 group-hover:opacity-0 transition-opacity duration-500 ${color}`}></div>
                <img
                    src={img}
                    alt={title}
                    loading="lazy"
                    className={`w-full h-full object-cover transition-transform duration-700 ${zoom ? 'scale-110 group-hover:scale-115' : 'transform group-hover:scale-105'}`}
                />
            </div>
        </div>
    </div>
);

export default Servicios;