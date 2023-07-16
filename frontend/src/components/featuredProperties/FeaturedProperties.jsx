import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";


const FeaturedProperties = () => {

  const { data, loading } = useFetch(
    "http://127.0.0.1:8000/api/hotels?featured=true"  
   );
  
    const image = 
      "https://www.google.com/imgres?imgurl=https%3A%2F%2Fdynamic-media-cdn.tripadvisor.com%2Fmedia%2Fphoto-o%2F12%2F5e%2Fb4%2Fa7%2Fhotel-facade.jpg%3Fw%3D700%26h%3D-1%26s%3D1&tbnid=nvmK7tdBHVDfBM&vet=12ahUKEwjZ0paxhPz_AhUpzKACHUkeDVYQMygDegUIARDXAQ..i&imgrefurl=https%3A%2F%2Fwww.tripadvisor.in%2FHotel_Review-g494941-d13431027-Reviews-WOW_Hotel-Indore_Indore_District_Madhya_Pradesh.html&docid=B95zLQecWV8rMM&w=700&h=371&q=hotel%20wow%20indore&ved=2ahUKEwjZ0paxhPz_AhUpzKACHUkeDVYQMygDegUIARDXAQ";
      
   
  return (
    <div className="fp">
      {loading ? 
      ("Loading Please Wait!"
      ) : (
      <>
     { data.map((item) =>(
        <div className="fpItem" key={item._id}>
         <img
          //src={item.photos[0]}
          src = {image}
          alt=""
          className="fpImg"
        />
        <span className="fpName">{item.name}</span>
        <span className="fpCity">{item.city}</span>
        <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
        {item.rating && <div className="fpRating">
          <button>{item.rating}</button>
          <span>Excellent</span>
        </div>}
      </div>))}
      
      </>)}
    </div>
  );
};

export default FeaturedProperties;
