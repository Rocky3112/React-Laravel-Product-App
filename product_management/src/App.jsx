import { useEffect, useState } from "react";

function App() {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);

  // GET
  const fetchProducts = () => {
    fetch("http://127.0.0.1:8000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ADD + UPDATE (FIXED)
  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", name);
  formData.append("price", price);

  if (image) {
    formData.append("image", image);
  }

  let url = "http://127.0.0.1:8000/api/products";
  let method = "POST";

  if (editId) {
    url = `http://127.0.0.1:8000/api/products/${editId}`;
    formData.append("_method", "PUT"); // 🔥 THIS IS THE FIX
    method = "POST"; // ALWAYS POST
  }

  await fetch(url, {
    method: method,
    body: formData,
  });

  setName("");
  setPrice("");
  setImage(null);
  setEditId(null);

  fetchProducts();
};
  // DELETE
  const deleteProduct = async (id) => {
    await fetch(`http://127.0.0.1:8000/api/products/${id}`, {
      method: "DELETE",
    });

    fetchProducts();
  };

  // EDIT
  const editProduct = (p) => {
    setName(p.name);
    setPrice(p.price);
    setEditId(p.id);
  };

  return (
    <div className="p-10">

      {/* FORM */}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">

        <input
          type="text"
          placeholder="Product Name"
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full border p-2 rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="file"
          className="w-full border p-2 rounded"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          {editId ? "Update Product" : "Add Product"}
        </button>

      </form>

      {/* LIST */}
      <div className="grid grid-cols-5 gap-4 mt-10">

        {products.map((p) => (
          <div key={p.id} className="border p-4 rounded shadow">

            {p.image && (
              <img
                src={`http://127.0.0.1:8000/images/${p.image}`}
                className="w-full h-48 object-contain mb-2"
              />
            )}

            <h2 className="font-bold">{p.name}</h2>
            <p>Price: ${p.price}</p>

            <div className="flex gap-2 mt-2">

              <button
                onClick={() => editProduct(p)}
                className="bg-yellow-500 text-white px-2 py-1"
              >
                Edit
              </button>

              <button
                onClick={() => deleteProduct(p.id)}
                className="bg-red-500 text-white px-2 py-1"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default App;