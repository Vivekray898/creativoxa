export default function MapSection() {
  return (
    <section className="w-full h-[450px] grayscale hover:grayscale-0 transition-all duration-700 border-t border-default">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d570.1669266633904!2d88.46047669754151!3d26.722403126344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e441511ea3e63d%3A0x7e1277301db1cb88!2sCreativoxa!5e1!3m2!1sen!2sin!4v1754940149321!5m2!1sen!2sin" 
        width="100%" 
        height="100%" 
        style={{ border: 0 }} 
        allowFullScreen 
        loading="lazy"
      />
    </section>
  );
}