function getRenderLocation() {
  const renderLocation = typeof window === "undefined" ? "server" : "client";
  return renderLocation;
}
export function isServer() {
  return getRenderLocation() === "server";
}

export function isClient() {
  return getRenderLocation() === "client";
}
