import { useParams } from "react-router-dom";

function ProductDetail() {
  const params = useParams();
  return (
    <pre>
      <code>{JSON.stringify(params, null, 3)}</code>
    </pre>
  );
}

export default ProductDetail;
