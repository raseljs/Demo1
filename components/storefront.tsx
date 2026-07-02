"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  blogs,
  brands,
  categories,
  money,
  products,
  store,
  type Product,
} from "@/lib/data";
import { useStore } from "@/components/store-provider";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/hot-deals", label: "Hot deals" },
  { href: "/offers", label: "Offers" },
  { href: "/blogs", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Storefront({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { count } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [term, setTerm] = useState("");
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const q = term.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/shop");
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="notice-bar">
        <div className="container notice-inner">
          <span>✦ Free delivery on selected orders over ৳2,000</span>
          <span className="notice-links">
            <Link href="/customer/order-track">Track order</Link>
            <Link href="/customer/login">Sign in</Link>
          </span>
        </div>
      </div>
      <div className="container header-main">
        <Link className="brand" href="/" aria-label="Super Ecommerce home">
          <img src={store.logo} alt={store.name} />
        </Link>
        <form className="search-box" onSubmit={submit} role="search">
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search products, brands and more"
            aria-label="Search products"
          />
          <button aria-label="Search">⌕</button>
        </form>
        <div className="header-actions">
          <Link href="/customer/account" className="icon-link">
            <span>♙</span>
            <small>Account</small>
          </Link>
          <Link href="/cart" className="icon-link cart-link">
            <span>▱</span>
            <small>Cart</small>
            {count > 0 && <b>{count}</b>}
          </Link>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen((x) => !x)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>
      <nav className={`main-nav ${menuOpen ? "open" : ""}`}>
        <div className="container nav-inner">
          <div className="category-menu">
            <span className="category-label">☷ Browse categories</span>
            <div className="category-flyout">
              {categories.map((category) => (
                <Link
                  href={`/category/${category.slug}`}
                  key={category.id}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{category.icon}</span>
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="nav-links">
            {navLinks.map((item) => (
              <Link
                className={pathname === item.href ? "active" : ""}
                href={item.href}
                key={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link href="/vendor/dashboard" className="sell-link">
            Start selling ↗
          </Link>
        </div>
      </nav>
    </header>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const subscribe = (event: FormEvent) => {
    event.preventDefault();
    if (email.trim()) {
      setSent(true);
      setEmail("");
    }
  };
  return (
    <footer className="site-footer">
      <div className="footer-top-line" />
      <div className="container footer-grid">
        <div>
          <img className="footer-logo" src={store.logo} alt={store.name} />
          <p>
            A modern marketplace for practical products, trusted sellers and
            simpler daily shopping.
          </p>
          <div className="socials">
            <a aria-label="Facebook" href="#">
              f
            </a>
            <a aria-label="Instagram" href="#">
              ◎
            </a>
            <a aria-label="Youtube" href="#">
              ▷
            </a>
          </div>
        </div>
        <div>
          <h3>Shop</h3>
          <Link href="/shop">All products</Link>
          <Link href="/hot-deals">Hot deals</Link>
          <Link href="/brands">Brands</Link>
          <Link href="/customer/order-track">Track your order</Link>
        </div>
        <div>
          <h3>Customer care</h3>
          <Link href="/contact">Contact us</Link>
          <Link href="/customer/login">My account</Link>
          <Link href="/customer/refunds">Returns & refunds</Link>
          <Link href="/offers">Offers</Link>
        </div>
        <div>
          <h3>Stay in the loop</h3>
          <p>New releases, special offers and buying guides.</p>
          <form className="newsletter" onSubmit={subscribe}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
            />
            <button>Join</button>
          </form>
          {sent && (
            <span className="form-success">Thanks — you are subscribed.</span>
          )}
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <span>
            © {new Date().getFullYear()} Super Ecommerce. Next.js conversion
            demo.
          </span>
          <span>
            {" "}
            <a
              href="https://wa.me/8801863840408?text=Hello%20Rasel%20Ahmed%2C%20I%20need%20help%20with%20the%20website."
              target="_blank"
              rel="noopener noreferrer"
              className="developer-credit"
            >
              Developed by Rasel Ahmed · WhatsApp: 01863840408
            </a>{" "}
          </span>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({
  eyebrow,
  title,
  text,
  children,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="container">
        <p className="eyebrow">{eyebrow ?? "Super Ecommerce"}</p>
        <h1>{title}</h1>
        {text && <p>{text}</p>}
        {children}
      </div>
    </section>
  );
}

export function SectionTitle({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="section-title">
      <div>
        <p className="eyebrow">{subtitle}</p>
        <h2>{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function CategoryStrip() {
  return (
    <section className="section container">
      <SectionTitle
        title="Shop by category"
        subtitle="Everything in one place"
        action={
          <Link href="/shop" className="text-link">
            View all →
          </Link>
        }
      />
      <div className="category-grid">
        {categories.map((category) => (
          <Link
            href={`/category/${category.slug}`}
            className="category-card"
            key={category.id}
          >
            <img src={category.image} alt="" />
            <div>
              <span>{category.icon}</span>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { addItem, recentlyAdded } = useStore();
  const [liked, setLiked] = useState(false);
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <Link href={`/product/${product.slug}`}>
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
        </Link>
        {product.badge && (
          <span className="product-badge">{product.badge}</span>
        )}
        {discount > 0 && <span className="discount-badge">-{discount}%</span>}
        <button
          className={`heart-button ${liked ? "liked" : ""}`}
          onClick={() => setLiked((value) => !value)}
          aria-label="Add to wishlist"
        >
          {liked ? "♥" : "♡"}
        </button>
        <button className="quick-add" onClick={() => addItem(product)}>
          {recentlyAdded === product.id ? "Added ✓" : "Add to cart"}
        </button>
      </div>
      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <Link href={`/product/${product.slug}`} className="product-name">
          {product.name}
        </Link>
        <div className="rating">
          <span>★</span> {product.rating.toFixed(1)}{" "}
          <small>({product.reviews})</small>
        </div>
        <div className="price-row">
          <strong>{money(product.price)}</strong>
          {product.oldPrice && <del>{money(product.oldPrice)}</del>}
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({
  list = products,
  emptyText = "No products matched this view.",
}: {
  list?: Product[];
  emptyText?: string;
}) {
  if (!list.length)
    return (
      <div className="empty-panel">
        <div>⌕</div>
        <h3>{emptyText}</h3>
        <Link href="/shop" className="button button-dark">
          Explore products
        </Link>
      </div>
    );
  return (
    <div className="product-grid">
      {list.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export function HomePage() {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(
      () => setSlide((current) => (current + 1) % store.heroSlides.length),
      5500,
    );
    return () => window.clearInterval(timer);
  }, []);
  const current = store.heroSlides[slide];
  const electronics = products
    .filter((item) => item.categorySlug === "electronics")
    .slice(0, 4);
  const fashion = products
    .filter((item) => item.categorySlug === "fashion")
    .slice(0, 4);
  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <aside className="hero-categories">
            <h3>Popular departments</h3>
            {categories.slice(0, 7).map((category) => (
              <Link href={`/category/${category.slug}`} key={category.id}>
                <span>{category.icon}</span>
                {category.name}
                <b>›</b>
              </Link>
            ))}
          </aside>
          <div className="hero-slide">
            <img src={current.image} alt="Seasonal offer" />
            <div className="hero-overlay">
              <p className="eyebrow">{current.eyebrow}</p>
              <h1>{current.title}</h1>
              <p>{current.text}</p>
              <Link href={current.href} className="button button-light">
                {current.cta} <span>→</span>
              </Link>
            </div>
            <div className="slide-dots">
              {store.heroSlides.map((_, index) => (
                <button
                  key={index}
                  className={index === slide ? "active" : ""}
                  onClick={() => setSlide(index)}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <div className="hero-side-offers">
            <Link href="/category/electronics">
              <img
                src="/assets/uploads/banner/17647810191468495_Mobile%20and%20gadgets%20top%20right%20side%20banner%20web.webp"
                alt="Mobile and gadgets"
              />
              <span>
                Mobile & gadgets <b>Explore →</b>
              </span>
            </Link>
            <Link href="/offers" className="offer-panel">
              <small>Weekend special</small>
              <strong>
                Extra savings
                <br />
                on selected products
              </strong>
              <span>Shop offer →</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="benefit-row">
        <div className="container benefits">
          {[
            ["↗", "Fast delivery", "Across Bangladesh"],
            ["◈", "Secure payment", "Your data is protected"],
            ["↺", "Easy returns", "Simple support process"],
            ["☎", "Helpful support", "Every day, 9am–9pm"],
          ].map(([icon, title, text]) => (
            <div key={title}>
              <i>{icon}</i>
              <span>
                <b>{title}</b>
                <small>{text}</small>
              </span>
            </div>
          ))}
        </div>
      </section>
      <CategoryStrip />
      <section className="section deal-section">
        <div className="container">
          <SectionTitle
            title="Hot deals"
            subtitle="Limited-time savings"
            action={
              <Link href="/hot-deals" className="text-link">
                See all deals →
              </Link>
            }
          />
          <ProductGrid list={products.slice(0, 8)} />
        </div>
      </section>
      <section className="container promotion-band">
        <div>
          <p className="eyebrow">Smart shopping, made simple</p>
          <h2>Everyday essentials for every side of life.</h2>
          <Link href="/shop" className="button button-dark">
            Browse the collection
          </Link>
        </div>
        <img src="/assets/images/app-download.png" alt="Shopping app" />
      </section>
      <section className="section container">
        <SectionTitle
          title="Electronics & gadgets"
          subtitle="Tech to make things easier"
          action={
            <Link href="/category/electronics" className="text-link">
              Shop electronics →
            </Link>
          }
        />
        <ProductGrid list={electronics} />
      </section>
      <section className="section muted-section">
        <div className="container">
          <SectionTitle
            title="Style favourites"
            subtitle="Fresh everyday looks"
            action={
              <Link href="/category/fashion" className="text-link">
                Explore fashion →
              </Link>
            }
          />
          <ProductGrid list={fashion} />
        </div>
      </section>
      <section className="section container">
        <SectionTitle
          title="Trusted brands"
          subtitle="Discover more"
          action={
            <Link href="/brands" className="text-link">
              All brands →
            </Link>
          }
        />
        <div className="brand-grid">
          {brands.map((brand) => (
            <Link
              href={`/search?q=${encodeURIComponent(brand.name)}`}
              key={brand.name}
              className="brand-card"
            >
              <img src={brand.image} alt={brand.name} />
              <span>{brand.name}</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="section container">
        <SectionTitle
          title="Latest from our blog"
          subtitle="Helpful shopping stories"
          action={
            <Link href="/blogs" className="text-link">
              View all articles →
            </Link>
          }
        />
        <div className="blog-grid">
          {blogs.map((blog) => (
            <article className="blog-card" key={blog.id}>
              <Link href={`/blogs/${blog.slug}`}>
                <img src={blog.image} alt={blog.title} />
              </Link>
              <div>
                <p>
                  {blog.category} · {blog.date}
                </p>
                <Link href={`/blogs/${blog.slug}`}>
                  <h3>{blog.title}</h3>
                </Link>
                <span>{blog.excerpt}</span>
                <Link href={`/blogs/${blog.slug}`} className="text-link">
                  Read article →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export function ShopControls({
  initialQuery = "",
  category = "",
}: {
  initialQuery?: string;
  category?: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState("featured");
  const filtered = useMemo(() => {
    const needle = query.toLowerCase().trim();
    let list = products.filter(
      (item) =>
        (!category || item.categorySlug === category) &&
        (!needle ||
          `${item.name} ${item.category} ${item.vendor}`
            .toLowerCase()
            .includes(needle)),
    );
    if (sort === "price-low")
      list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-high")
      list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [query, category, sort]);
  const onSearch = (event: FormEvent) => {
    event.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };
  return (
    <div className="shop-layout">
      <aside className="filter-panel">
        <h3>Categories</h3>
        <Link className={!category ? "selected" : ""} href="/shop">
          All products <span>{products.length}</span>
        </Link>
        {categories.map((item) => (
          <Link
            className={category === item.slug ? "selected" : ""}
            href={`/category/${item.slug}`}
            key={item.slug}
          >
            {item.name}
            <span>
              {products.filter((p) => p.categorySlug === item.slug).length}
            </span>
          </Link>
        ))}
        <hr />
        <h3>Price</h3>
        <label>
          <input type="checkbox" /> Under ৳1,000
        </label>
        <label>
          <input type="checkbox" /> ৳1,000 – ৳3,000
        </label>
        <label>
          <input type="checkbox" /> ৳3,000+
        </label>
        <hr />
        <h3>Delivery</h3>
        <label>
          <input type="checkbox" /> In stock only
        </label>
      </aside>
      <div className="shop-content">
        <form className="inline-search" onSubmit={onSearch}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search this collection"
          />
          <button>Search</button>
        </form>
        <div className="shop-toolbar">
          <p>
            <b>{filtered.length}</b> products found
          </p>
          <label>
            Sort by{" "}
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="rating">Top rated</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
          </label>
        </div>
        <ProductGrid list={filtered} />
      </div>
    </div>
  );
}

export function ProductDetail({ product }: { product: Product }) {
  const { addItem, recentlyAdded } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
  const gallery = product.gallery?.length ? product.gallery : [product.image];
  const related = products
    .filter(
      (item) =>
        item.categorySlug === product.categorySlug && item.id !== product.id,
    )
    .slice(0, 4);
  return (
    <>
      <section className="container product-detail">
        <div className="product-gallery">
          <div className="main-product-image">
            <img src={activeImage} alt={product.name} />
          </div>
          {gallery.length > 1 && (
            <div className="thumbnail-list">
              {gallery.map((image) => (
                <button
                  className={activeImage === image ? "active" : ""}
                  key={image}
                  onClick={() => setActiveImage(image)}
                >
                  <img src={image} alt="Product view" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="product-summary">
          <Link
            href={`/category/${product.categorySlug}`}
            className="crumb-link"
          >
            {product.category}
          </Link>
          <h1>{product.name}</h1>
          <div className="detail-rating">
            <span>★★★★★</span>
            <b>{product.rating.toFixed(1)}</b>
            <small>{product.reviews} customer reviews</small>
          </div>
          <div className="detail-price">
            <strong>{money(product.price)}</strong>
            {product.oldPrice && <del>{money(product.oldPrice)}</del>}
            {product.oldPrice && (
              <em>Save {money(product.oldPrice - product.price)}</em>
            )}
          </div>
          <p className="product-description">{product.description}</p>
          {product.colors?.length && (
            <div className="choice-row">
              <b>
                Colour: <span>{selectedColor}</span>
              </b>
              <div>
                {product.colors.map((color) => (
                  <button
                    className={
                      selectedColor === color ? "choice active" : "choice"
                    }
                    key={color}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}
          {product.sizes?.length && (
            <div className="choice-row">
              <b>
                Size: <span>{selectedSize}</span>
              </b>
              <div>
                {product.sizes.map((size) => (
                  <button
                    className={
                      selectedSize === size ? "choice active" : "choice"
                    }
                    key={size}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="purchase-row">
            <div className="quantity-control">
              <button
                onClick={() => setQuantity((qty) => Math.max(1, qty - 1))}
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                onClick={() =>
                  setQuantity((qty) => Math.min(product.stock, qty + 1))
                }
              >
                +
              </button>
            </div>
            <button
              className="button button-dark add-detail"
              onClick={() => addItem(product, quantity)}
            >
              {recentlyAdded === product.id ? "Added to cart ✓" : "Add to cart"}
            </button>
            <button className="wish-detail" aria-label="Add to wishlist">
              ♡
            </button>
          </div>
          <div className="stock-line">
            <span className="stock-dot" /> In stock — only {product.stock} left
          </div>
          <div className="seller-box">
            <div className="seller-avatar">
              {product.vendor?.slice(0, 1) ?? "S"}
            </div>
            <div>
              <small>Sold by</small>
              <b>{product.vendor ?? "Super Ecommerce"}</b>
            </div>
            <Link href="/contact">Contact seller →</Link>
          </div>
          <div className="detail-promises">
            <span>◈ Secure payment</span>
            <span>↗ Fast delivery</span>
            <span>↺ Easy return policy</span>
          </div>
        </div>
      </section>
      <section className="container detail-description">
        <div>
          <h2>Product information</h2>
          <p>{product.description}</p>
          <p>
            Product availability, delivery timing and the final order
            confirmation may vary by location. Our support team is ready to help
            with product or order questions.
          </p>
        </div>
        <div>
          <h2>Delivery & returns</h2>
          <p>
            Standard delivery is available across Bangladesh. Unused physical
            items may be eligible for return according to the store policy.
          </p>
        </div>
      </section>
      {related.length > 0 && (
        <section className="section container">
          <SectionTitle
            title="You may also like"
            subtitle="More from this category"
          />
          <ProductGrid list={related} />
        </section>
      )}
    </>
  );
}

export function CartExperience() {
  const { cart, subtotal, updateQuantity, removeItem } = useStore();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const delivery = subtotal ? (subtotal >= 2000 ? 0 : 80) : 0;
  const applyCoupon = (event: FormEvent) => {
    event.preventDefault();
    setDiscount(
      coupon.trim().toUpperCase() === "WELCOME10"
        ? Math.round(subtotal * 0.1)
        : 0,
    );
  };
  if (!cart.length)
    return (
      <section className="container section">
        <div className="empty-panel cart-empty">
          <div>▱</div>
          <h2>Your cart is ready when you are.</h2>
          <p>Browse practical picks and add the products you love.</p>
          <Link href="/shop" className="button button-dark">
            Continue shopping
          </Link>
        </div>
      </section>
    );
  return (
    <section className="container cart-layout">
      <div className="cart-table">
        <div className="cart-head">
          <h2>
            Shopping cart <span>({cart.length} items)</span>
          </h2>
          <Link href="/shop">Continue shopping →</Link>
        </div>
        {cart.map((line) => (
          <div className="cart-line" key={line.product.id}>
            <Link href={`/product/${line.product.slug}`}>
              <img src={line.product.image} alt={line.product.name} />
            </Link>
            <div className="cart-line-info">
              <p>{line.product.category}</p>
              <Link href={`/product/${line.product.slug}`}>
                {line.product.name}
              </Link>
              <button onClick={() => removeItem(line.product.id)}>
                Remove
              </button>
            </div>
            <div className="quantity-control">
              <button
                onClick={() =>
                  updateQuantity(line.product.id, line.quantity - 1)
                }
              >
                −
              </button>
              <span>{line.quantity}</span>
              <button
                onClick={() =>
                  updateQuantity(line.product.id, line.quantity + 1)
                }
              >
                +
              </button>
            </div>
            <strong>{money(line.product.price * line.quantity)}</strong>
          </div>
        ))}
      </div>
      <aside className="order-summary">
        <h2>Order summary</h2>
        <div>
          <span>Subtotal</span>
          <b>{money(subtotal)}</b>
        </div>
        <div>
          <span>Delivery</span>
          <b>{delivery ? money(delivery) : "Free"}</b>
        </div>
        {discount > 0 && (
          <div className="summary-discount">
            <span>Coupon discount</span>
            <b>−{money(discount)}</b>
          </div>
        )}
        <hr />
        <div className="summary-total">
          <span>Total</span>
          <b>{money(subtotal + delivery - discount)}</b>
        </div>
        <form className="coupon-row" onSubmit={applyCoupon}>
          <input
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Coupon code"
          />
          <button>Apply</button>
        </form>
        {coupon && !discount && (
          <p className="coupon-hint">
            Try <b>WELCOME10</b> for this demo.
          </p>
        )}
        <Link href="/checkout" className="button button-dark checkout-button">
          Proceed to checkout →
        </Link>
        <p className="safe-note">
          ◈ Secure checkout. Your order details stay protected.
        </p>
      </aside>
    </section>
  );
}

export function CheckoutExperience() {
  const { cart, subtotal, clearCart } = useStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState("cod");
  const delivery = subtotal >= 2000 ? 0 : 80;
  const placeOrder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!cart.length) return router.push("/cart");
    setLoading(true);
    const form = new FormData(event.currentTarget);
    const orderNumber = `SE-${String(Date.now()).slice(-7)}`;
    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderNumber,
          customer: Object.fromEntries(form.entries()),
          items: cart,
          method,
        }),
      });
    } catch {
      /* local frontend checkout still completes */
    }
    clearCart();
    router.push(`/order-success?order=${orderNumber}`);
  };
  return (
    <section className="container checkout-layout">
      <form className="checkout-form" onSubmit={placeOrder}>
        <div className="checkout-block">
          <h2>Contact information</h2>
          <div className="form-grid">
            <label>
              Full name
              <input name="name" required placeholder="Your full name" />
            </label>
            <label>
              Mobile number
              <input
                name="phone"
                required
                inputMode="tel"
                placeholder="01XXXXXXXXX"
              />
            </label>
            <label className="full">
              Email address <span>(optional)</span>
              <input name="email" type="email" placeholder="you@example.com" />
            </label>
          </div>
        </div>
        <div className="checkout-block">
          <h2>Delivery address</h2>
          <div className="form-grid">
            <label className="full">
              Address
              <input name="address" required placeholder="House, road, area" />
            </label>
            <label>
              District
              <select name="district" defaultValue="">
                <option value="" disabled>
                  Select district
                </option>
                <option>Dhaka</option>
                <option>Chattogram</option>
                <option>Khulna</option>
                <option>Rajshahi</option>
                <option>Sylhet</option>
                <option>Other</option>
              </select>
            </label>
            <label>
              Area / post code
              <input name="area" required placeholder="Area or post code" />
            </label>
            <label className="full">
              Order note <span>(optional)</span>
              <textarea
                name="note"
                placeholder="Delivery instructions or a note for the seller"
                rows={3}
              />
            </label>
          </div>
        </div>
        <div className="checkout-block">
          <h2>Payment method</h2>
          <div className="payment-options">
            <label
              className={
                method === "cod" ? "payment-option active" : "payment-option"
              }
            >
              <input
                type="radio"
                checked={method === "cod"}
                onChange={() => setMethod("cod")}
              />{" "}
              <span>
                <b>Cash on delivery</b>
                <small>Pay when your order arrives.</small>
              </span>
            </label>
            <label
              className={
                method === "online" ? "payment-option active" : "payment-option"
              }
            >
              <input
                type="radio"
                checked={method === "online"}
                onChange={() => setMethod("online")}
              />{" "}
              <span>
                <b>Online payment</b>
                <small>
                  Connect bKash, ShurjoPay or UddoktaPay in production.
                </small>
              </span>
            </label>
          </div>
        </div>
        <button disabled={loading} className="button button-dark place-order">
          {loading ? "Placing order…" : "Place order securely →"}
        </button>
      </form>
      <CheckoutSummary items={cart} subtotal={subtotal} delivery={delivery} />
    </section>
  );
}

export function CheckoutSummary({
  items,
  subtotal,
  delivery,
}: {
  items: { product: Product; quantity: number }[];
  subtotal: number;
  delivery: number;
}) {
  return (
    <aside className="order-summary checkout-summary">
      <h2>Your order</h2>
      {items.length ? (
        <>
          <div className="checkout-items">
            {items.map((line) => (
              <div key={line.product.id}>
                <img src={line.product.image} alt="" />
                <span>
                  {line.product.name}
                  <small>Qty {line.quantity}</small>
                </span>
                <b>{money(line.product.price * line.quantity)}</b>
              </div>
            ))}
          </div>
          <hr />
          <div>
            <span>Subtotal</span>
            <b>{money(subtotal)}</b>
          </div>
          <div>
            <span>Delivery</span>
            <b>{delivery ? money(delivery) : "Free"}</b>
          </div>
          <hr />
          <div className="summary-total">
            <span>Total</span>
            <b>{money(subtotal + delivery)}</b>
          </div>
        </>
      ) : (
        <p>Your cart is currently empty.</p>
      )}
    </aside>
  );
}

export function ContactExperience() {
  const [done, setDone] = useState(false);
  return (
    <section className="container contact-layout">
      <div className="contact-intro">
        <p className="eyebrow">Customer care</p>
        <h1>We are here to help.</h1>
        <p>
          Questions about an order, a seller or a product? Send the team a
          message and we will get back to you.
        </p>
        <div className="contact-details">
          <span>
            ☎ <b>{store.phone}</b>
            <small>Daily, 9am–9pm</small>
          </span>
          <span>
            ✉ <b>{store.email}</b>
            <small>We usually reply within one business day.</small>
          </span>
          <span>
            ⌂ <b>{store.address}</b>
            <small>Online marketplace support</small>
          </span>
        </div>
      </div>
      <form
        className="contact-form"
        onSubmit={(e) => {
          e.preventDefault();
          setDone(true);
        }}
      >
        <h2>Send a message</h2>
        <div className="form-grid">
          <label>
            Full name
            <input required placeholder="Your name" />
          </label>
          <label>
            Phone
            <input required placeholder="01XXXXXXXXX" />
          </label>
          <label className="full">
            Email
            <input type="email" required placeholder="you@example.com" />
          </label>
          <label className="full">
            How can we help?
            <textarea required rows={5} placeholder="Write your message here" />
          </label>
        </div>
        <button className="button button-dark">Send message →</button>
        {done && (
          <p className="form-success">
            Thanks — your message has been recorded in this demo.
          </p>
        )}
      </form>
    </section>
  );
}

export function CustomerCentre({ section }: { section?: string[] }) {
  const route = section?.[0] ?? "account";
  const title: Record<string, string> = {
    login: "Welcome back",
    register: "Create your account",
    "order-track": "Track your order",
    refunds: "Returns & refunds",
    account: "My account",
  };
  const [tracked, setTracked] = useState(false);
  const content =
    route === "order-track" ? (
      <>
        <p>Enter the order number and the phone number used at checkout.</p>
        <form
          className="account-form"
          onSubmit={(e) => {
            e.preventDefault();
            setTracked(true);
          }}
        >
          <label>
            Order number
            <input required placeholder="Example: SE-1234567" />
          </label>
          <label>
            Mobile number
            <input required placeholder="01XXXXXXXXX" />
          </label>
          <button className="button button-dark">Track order</button>
        </form>
        {tracked && (
          <div className="tracking-result">
            <b>Order received</b>
            <span>
              Your order is being prepared. Our team will confirm delivery
              shortly.
            </span>
          </div>
        )}
      </>
    ) : (
      <>
        <p>
          {route === "login"
            ? "Sign in to review orders, manage saved information and request support."
            : route === "register"
              ? "Create a customer account to make checkout faster on your next order."
              : "Your account dashboard will show your order history, saved addresses and refunds after authentication is connected."}
        </p>
        <form className="account-form" onSubmit={(e) => e.preventDefault()}>
          <label>
            Email address
            <input type="email" required placeholder="you@example.com" />
          </label>
          {route !== "account" && (
            <label>
              Password
              <input type="password" required placeholder="••••••••" />
            </label>
          )}
          <button className="button button-dark">
            {route === "register"
              ? "Create account"
              : route === "login"
                ? "Sign in"
                : "Manage account"}
          </button>
        </form>
      </>
    );
  return (
    <section className="container account-page">
      <div className="account-side">
        <p className="eyebrow">Customer account</p>
        <h1>{title[route] ?? "My account"}</h1>
        <nav>
          <Link href="/customer/account">Overview</Link>
          <Link href="/customer/orders">Orders</Link>
          <Link href="/customer/order-track">Track order</Link>
          <Link href="/customer/refunds">Refunds</Link>
          <Link href="/customer/login">Sign in</Link>
        </nav>
      </div>
      <div className="account-card">{content}</div>
    </section>
  );
}

export function DashboardPanel({
  role,
  panel,
}: {
  role: "Admin" | "Vendor" | "Reseller";
  panel?: string[];
}) {
  const page = panel?.[0] ?? "dashboard";
  const labels: Record<string, string> = {
    dashboard: "Dashboard",
    products: "Products",
    orders: "Orders",
    customers: "Customers",
    analytics: "Analytics",
    settings: "Settings",
    withdrawals: "Withdrawals",
    refunds: "Refunds",
    reports: "Reports",
    categories: "Categories",
    campaigns: "Campaigns",
    employees: "Employees",
  };
  const links =
    role === "Admin"
      ? [
          "dashboard",
          "orders",
          "products",
          "categories",
          "customers",
          "campaigns",
          "reports",
          "employees",
          "settings",
        ]
      : role === "Vendor"
        ? [
            "dashboard",
            "products",
            "orders",
            "analytics",
            "customers",
            "refunds",
            "withdrawals",
            "settings",
          ]
        : ["dashboard", "products", "orders", "withdrawals", "settings"];
  const prefix = role.toLowerCase();
  return (
    <main className="panel-layout">
      <aside className="panel-sidebar">
        <Link href="/" className="panel-brand">
          <img src={store.logo} alt="Super Ecommerce" />
        </Link>
        <p>{role} portal</p>
        <nav>
          {links.map((item) => (
            <Link
              href={`/${prefix}/${item}`}
              className={page === item ? "active" : ""}
              key={item}
            >
              <span>
                {item === "dashboard"
                  ? "▦"
                  : item === "orders"
                    ? "▤"
                    : item === "products"
                      ? "◫"
                      : "◇"}
              </span>
              {labels[item]}
            </Link>
          ))}
        </nav>
        <Link className="back-store" href="/">
          ← Back to store
        </Link>
      </aside>
      <section className="panel-main">
        <header className="panel-header">
          <div>
            <p>{role} portal</p>
            <h1>{labels[page] ?? "Workspace"}</h1>
          </div>
          <div className="panel-user">
            <span>AN</span>
            <div>
              <b>Alex Nelson</b>
              <small>{role.toLowerCase()}@demo.com</small>
            </div>
          </div>
        </header>
        {page === "dashboard" ? (
          <DashboardHome role={role} />
        ) : (
          <DashboardTable page={labels[page] ?? page} role={role} />
        )}
      </section>
    </main>
  );
}

function DashboardHome({ role }: { role: string }) {
  const metrics =
    role === "Admin"
      ? [
          ["৳ 254,380", "Gross sales", "+12.5%"],
          ["1,284", "Orders", "+8.2%"],
          ["842", "Customers", "+4.1%"],
          ["56", "Pending reviews", "Needs action"],
        ]
      : role === "Vendor"
        ? [
            ["৳ 84,650", "Gross sales", "+9.3%"],
            ["186", "Orders", "+7.4%"],
            ["34", "Products live", "2 low stock"],
            ["৳ 18,420", "Available balance", "Updated today"],
          ]
        : [
            ["৳ 32,800", "Order value", "+11.6%"],
            ["63", "Orders", "+5.3%"],
            ["৳ 4,780", "Commission", "This month"],
            ["৳ 8,920", "Wallet balance", "Ready to withdraw"],
          ];
  return (
    <>
      <div className="panel-metrics">
        {metrics.map(([value, label, trend]) => (
          <article key={label}>
            <p>{label}</p>
            <h2>{value}</h2>
            <span>{trend}</span>
          </article>
        ))}
      </div>
      <div className="dashboard-columns">
        <section className="panel-card chart-card">
          <div className="panel-card-heading">
            <h2>Sales overview</h2>
            <select defaultValue="30">
              <option value="30">Last 30 days</option>
              <option value="7">Last 7 days</option>
            </select>
          </div>
          <div className="chart-placeholder">
            <div className="chart-bars">
              {[48, 70, 54, 78, 66, 90, 76, 96, 82, 112, 98, 126].map(
                (height, index) => (
                  <span style={{ height }} key={index} />
                ),
              )}
            </div>
            <div className="chart-axis">
              <span>May 01</span>
              <span>May 10</span>
              <span>May 20</span>
              <span>May 30</span>
            </div>
          </div>
        </section>
        <section className="panel-card recent-card">
          <div className="panel-card-heading">
            <h2>Recent orders</h2>
            <Link href={`/${role.toLowerCase()}/orders`}>View all</Link>
          </div>
          {["SE-104381", "SE-104380", "SE-104379", "SE-104378"].map(
            (order, index) => (
              <div className="mini-order" key={order}>
                <span className="mini-avatar">
                  {["MA", "RH", "TS", "AS"][index]}
                </span>
                <div>
                  <b>{order}</b>
                  <small>
                    {
                      [
                        "Maruf Ahmed",
                        "Raihan Hossain",
                        "Tasnim Sultana",
                        "Anika S.",
                      ][index]
                    }
                  </small>
                </div>
                <strong>{money([2460, 1300, 2200, 900][index])}</strong>
              </div>
            ),
          )}
        </section>
      </div>
    </>
  );
}

function DashboardTable({ page, role }: { page: string; role: string }) {
  const data =
    page === "Products"
      ? products
          .slice(0, 7)
          .map((product) => [
            product.name,
            product.category,
            money(product.price),
            String(product.stock),
            "Active",
          ])
      : [
          ["SE-104381", "Maruf Ahmed", "৳ 2,460", "Processing", "Today"],
          ["SE-104380", "Raihan Hossain", "৳ 1,300", "Delivered", "Today"],
          ["SE-104379", "Tasnim Sultana", "৳ 2,200", "Pending", "Yesterday"],
          ["SE-104378", "Anika S.", "৳ 900", "Delivered", "Yesterday"],
        ];
  return (
    <section className="panel-card table-card">
      <div className="table-tools">
        <div>
          <h2>{page}</h2>
          <p>
            Manage {page.toLowerCase()} in your {role.toLowerCase()} workspace.
          </p>
        </div>
        <button className="button button-dark">
          + Add {page === "Products" ? "product" : "new"}
        </button>
      </div>
      <div className="responsive-table">
        <table>
          <thead>
            <tr>
              {(page === "Products"
                ? ["Product", "Category", "Price", "Stock", "Status"]
                : ["Order", "Customer", "Amount", "Status", "Date"]
              ).map((head) => (
                <th key={head}>{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>
                    {cellIndex === row.length - 2 ? (
                      <span
                        className={`status-pill ${String(cell).toLowerCase()}`}
                      >
                        {cell}
                      </span>
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
