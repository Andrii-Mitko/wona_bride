type Props = {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
};

export default function Skeleton({
  width = "100%",
  height = "16px",
  borderRadius,
  className = "",
}: Props) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{ width, height, borderRadius }}
    />
  );
}
