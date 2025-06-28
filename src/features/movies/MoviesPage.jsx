import { useParams } from "react-router";
import { useGetItems } from "../../hooks/getItems"
import Card from "../../components/Card/Card";
import { PrimaryButton } from "../../components/Button/Button";

export default function MoviesPage() {

  const { category } = useParams();
  const title = category.replace(/[-]/g, " ");
  const movies = useGetItems(title);
  console.log(movies, title)

  return (
    <section className="w-full flex flex-col items-center my-36">
      <h2 className=" text-white  font-poppins font-bold text-3xl">{title}</h2>
      <div className="w-full flex justify-center items-center">
        <div className=" grid grid-cols-5 m-auto gap-20 py-16">
          {movies.map((movie) =>
            <Card
              key={movie.id}
              movie={movie} />
          )}
        </div>
      </div>
      <PrimaryButton
      text={'Load More'}/>
    </section>

  );
}
