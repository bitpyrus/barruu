import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedArticles from "@/components/FeaturedArticles";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <FeaturedArticles />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
