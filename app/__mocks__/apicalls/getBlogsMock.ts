export default async function getBlogsMock() {
  try {
    const res = await fetch('/blogs');
    const mockBlogs = await res.json();
    return mockBlogs;
  } catch (error: any) {
    console.log(error);
    return [];
  }
}
