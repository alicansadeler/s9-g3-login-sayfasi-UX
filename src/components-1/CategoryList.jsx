import Category from './Category.jsx';
export default function CategoryList(props) {
  /* ADIM 2: categorileri prop olarak alabilirsin */
  const { categories } = props;
  return (
    <>
      {categories.map((item, index) => (
        <Category category={item} key={index} />
      ))}
    </>
  );
}
