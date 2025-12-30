import axios from "axios";

const fetchCategoryName = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/v1/products/category-all"
    );
    console.log(response.data.data);
    const data = response.data.data.sort();
    return data;
  } catch (error) {
    console.log("error occurred while fetching data:");
  }
};

const handleCategoryClick = (event, index, setActive) => {
  // this function set the brand as block so that the brand block become available and set index in category so that we know which option was clicked.
  setActive((prev) => {
    return { ...prev, category: index };
  });
};

export { handleCategoryClick };
