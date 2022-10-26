import Banner from "../components/Banner";
import Layout from "../components/Layout";
import ProductFeed from "../components/ProductFeed";

export default function Home({ products }) {
  return (
    <Layout title='Home Page'>
      <div className="bg-gray-100">
        <main className="max-w-screen-2xl mx-auto">
          <Banner />
          <ProductFeed products={products} />
        </main>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const products = await fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
  return {
    props: {
      products,
    },
  }

}
