export default function RedirectPage({ params }) {
  if (typeof window !== "undefined") {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/${params.code}`;
  }

  return <p className="text-center p-6">Redirecting...</p>;
}
