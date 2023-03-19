const LandingPage = ({ color }) => {
  console.log('I am in the component', color);
  return <div>Landing23</div>;
};

LandingPage.getInitialProps = () => {
  console.log('I am on the server');

  return { color: 'red' };
};

export default LandingPage;
