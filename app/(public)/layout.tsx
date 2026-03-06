import Footer from "./_components/Footer";
import Header from "./_components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <Header />
            <main className="mx-auto sm:px-6 lg:px-8">
                {children}
            </main>
            <Footer />
        </section>
    );
}
