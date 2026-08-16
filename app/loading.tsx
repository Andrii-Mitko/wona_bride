import Skeleton from "@/components/Skeleton/Skeleton";

const Loading = () => {
  return (
    <div style={{ padding: "64px 20px", maxWidth: "600px", margin: "0 auto" }}>
      <Skeleton height="32px" width="60%" className="mb-32" />
      <Skeleton height="16px" className="mb-8" />
      <Skeleton height="16px" width="80%" />
    </div>
  );
};

export default Loading;
