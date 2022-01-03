import { useParams } from "react-router-dom";

function EditProductPage() {
  const params = useParams();
  return (
    <pre>
      <code>{JSON.stringify(params, null, 3)}</code>
    </pre>
  );
}

export default EditProductPage;
