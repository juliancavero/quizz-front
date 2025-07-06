import Title from "@/components/Text/Title";
import useHome from "./useHome";

const Home = () => {
  const { count, setCount } = useHome();
  return (
    <div>
      <Title>Home</Title>
      <p>{count}</p>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default Home;
