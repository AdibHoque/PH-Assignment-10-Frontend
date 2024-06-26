import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PropTypes from "prop-types";

const MySwal = withReactContent(Swal);

import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../AuthProvider";
import {Link} from "react-router-dom";

TD.propTypes = {
  spot: PropTypes.string,
  country: PropTypes.string,
  cost: PropTypes.string,
  _id: PropTypes.string,
};

function deleteSpot(id) {
  MySwal.fire({
    title: "Delete?",
    text: "This data will be lost forever if you delete. Are you sure you want to Delete?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Delete",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`https://assignment-10-api-peach.vercel.app/touristspots/${id}`, {
        method: "DELETE",
      });
      Swal.fire({
        title: "Deleted!",
        text: "The Data has been deleted",
        icon: "success",
      });
    }
  });
}

function TD({spot, country, cost, _id}) {
  return (
    <tr>
      <td>{spot}</td>
      <td>{country}</td>
      <td>{cost}</td>
      <td className="flex items-center justify-center gap-2">
        <Link
          to={`/updatetouristspot/${_id}`}
          className="border-none btn btn-warning btn-xs"
        >
          Update
        </Link>
        <button
          onClick={() => deleteSpot(_id)}
          className="bg-red-600 border-none btn btn-error btn-xs"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default function MyList() {
  const {user} = useContext(AuthContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(
      `https://assignment-10-api-peach.vercel.app/touristspots/user/${user.email}`
    )
      .then((data) => data.json())
      .then((data) => setData(data));
  }, [data]);
  if (data.length == 0) {
    return (
      <div className="flex justify-center w-full">
        <span className="text-green-500 loading loading-spinner size-40"></span>
      </div>
    );
  }
  return (
    <>
      <div className="px-4 overflow-x-auto md:px-24 min-h-[87vh]">
        <h1 className="my-8 text-5xl font-bold text-center text-green-500 animate__animated animate__bounce font-merriweather banner-font">
          My List
        </h1>
        <table className="mx-auto mb-6 border table-xs table-zebra-zebra md:table-md lg:table-lg border-base-300">
          {/* head */}
          <thead>
            <tr>
              <th>Tourist Spot Name</th>
              <th>Country</th>
              <th>Average Cost</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data.map((d) => (
              <TD
                key={d._id}
                spot={d.tourists_spot_name}
                country={d.country_name}
                cost={d.average_cost}
                _id={d._id}
              ></TD>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
