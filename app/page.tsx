const services = [
  { number: "01", title: "Strategi Digital", text: "Arah yang jelas, prioritas yang tepat, dan rencana pertumbuhan yang terukur." },
  { number: "02", title: "Web Development", text: "Website cepat, responsif, dan mudah digunakan di setiap ukuran layar." },
  { number: "03", title: "Brand Experience", text: "Identitas visual yang konsisten untuk membuat bisnis Anda lebih mudah diingat." },
];

export default function Home() {
  return (
    <div className="site-shell">
      <header className="fixed-top site-header">
        <nav className="navbar navbar-expand" aria-label="Navigasi utama">
          <div className="container">
            <a className="navbar-brand" href="#beranda" aria-label="BUQ Studio - Beranda">
              <span className="brand-mark">B</span>
              <span>BUQ<span className="brand-dot">.</span></span>
            </a>
            <div className="navbar-nav ms-auto align-items-center gap-1 gap-md-3">
              <a className="nav-link d-none d-sm-block" href="#layanan">Layanan</a>
              <a className="nav-link d-none d-sm-block" href="#tentang">Tentang</a>
              <a className="btn btn-dark rounded-pill px-3 px-md-4" href="#kontak">Mulai proyek</a>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section id="beranda" className="hero-section">
          <div className="container position-relative">
            <div className="row align-items-center min-vh-content g-5">
              <div className="col-lg-7">
                <div className="eyebrow mb-4"><span /> Studio digital independen</div>
                <h1 className="display-1 fw-semibold mb-4">Ide bagus layak tampil <span>luar biasa.</span></h1>
                <p className="lead text-secondary mb-5">Kami membantu brand tumbuh melalui strategi, desain, dan teknologi yang terasa sederhana—tetapi bekerja lebih keras.</p>
                <div className="d-flex flex-wrap gap-3">
                  <a className="btn btn-dark btn-lg rounded-pill px-4" href="#layanan">Lihat layanan <span aria-hidden="true">→</span></a>
                  <a className="btn btn-link btn-lg text-dark text-decoration-none" href="#tentang">Kenal lebih dekat</a>
                </div>
              </div>
              <div className="col-lg-5 d-none d-lg-block">
                <div className="hero-art" aria-hidden="true">
                  <div className="orbit orbit-one" /><div className="orbit orbit-two" />
                  <div className="art-card"><span>Think.</span><strong>Build.</strong><em>Grow.</em></div>
                  <div className="accent-block" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="layanan" className="services-section py-5">
          <div className="container py-4">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-5">
              <div><div className="section-label">Apa yang kami kerjakan</div><h2 className="display-5 fw-semibold mb-0">Dari gagasan menjadi dampak.</h2></div>
              <p className="text-secondary mb-0 services-intro">Solusi digital yang fokus pada tujuan bisnis, bukan sekadar terlihat bagus.</p>
            </div>
            <div className="row g-3">
              {services.map((service) => (
                <div className="col-md-4" key={service.number}>
                  <article className="service-card h-100">
                    <span className="service-number">{service.number}</span><h3>{service.title}</h3><p>{service.text}</p><span className="card-arrow" aria-hidden="true">↗</span>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="tentang" className="about-section py-5">
          <div className="container py-5">
            <div className="row g-5 align-items-center">
              <div className="col-lg-5"><div className="stat-box"><strong>8+</strong><span>Tahun mengubah ide menjadi produk digital.</span></div></div>
              <div className="col-lg-7"><div className="section-label">Tentang BUQ</div><h2 className="display-5 fw-semibold">Tim kecil dengan perhatian besar pada detail.</h2><p className="lead text-secondary mt-4">Kami percaya proses terbaik lahir dari kolaborasi yang jujur, komunikasi yang ringkas, dan keberanian untuk memangkas hal yang tidak perlu.</p></div>
            </div>
          </div>
        </section>
      </main>

      <footer id="kontak" className="fixed-bottom site-footer">
        <div className="container d-flex justify-content-between align-items-center">
          <span>© 2026 BUQ Studio</span>
          <a href="mailto:hello@buq.studio">hello@buq.studio <span aria-hidden="true">↗</span></a>
        </div>
      </footer>
    </div>
  );
}
