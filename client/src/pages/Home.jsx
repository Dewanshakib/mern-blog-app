import Loading from "../common/Loading";
import Blogs from "../components/Blogs";

const Home = ({ blogs }) => {
  return (
    <div className="min-h-screen px-4 flex flex-col gap-16 pb-10">
      {!blogs ? (
        <div className="text-center flex items-center">
          <Loading/>
        </div>
      ) : (
        blogs.length > 0 &&
        blogs.map((blog, index) => {
          return <Blogs key={index} {...blog} />;
        })
      )}
    </div>
  );
};

export default Home;
