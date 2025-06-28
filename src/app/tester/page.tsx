'use client'
import React from "react";

const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formdata = new FormData(e.currentTarget);
  console.log(formdata);
};
export default function page() {
  return (
    <>
      <form onSubmit={handlesubmit}>
        <input type="file" name="file" accept="application/pdf" required />
        <button type="submit">Submit form</button>
      </form>
    </>
  );
}
