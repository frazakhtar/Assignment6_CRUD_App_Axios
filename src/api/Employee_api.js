import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = "https://68ce761d6dc3f350777f0bfa.mockapi.io/crud";

const notify =()=>toast("User Deleted Successfully");

export const getData = (setLoading, setEmployees) => {
    setLoading(true);
    axios
      .get(baseUrl)
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

export const handleDelete = async (id, setEmployees, setShowDeleteModal) => {
    try {
      await axios.delete(`${baseUrl}/${id}`);
      notify();
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
      setShowDeleteModal(false)
    } catch (err) {
      console.log("Deletion Not Done:", err);
    }
  };



