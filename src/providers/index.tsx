import QueryProv from "./query";
import RouterProv from "./router";
import ThemeProv from "./theme";

const MainProvider = () => {
  return (
    <QueryProv>
      <ThemeProv>
        <RouterProv />
      </ThemeProv>
    </QueryProv>
  );
};

export default MainProvider;
