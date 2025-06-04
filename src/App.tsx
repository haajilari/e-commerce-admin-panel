// src/App.tsx
import Typography from './components/atoms/Typography/Typography' // Using path alias

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <Typography as="h1" variant="heading1">
        E-commerce Admin Panel
      </Typography>

      <Typography as="p" variant="body1" style={{ marginTop: '10px' }}>
        Welcome to the admin panel. Here you can manage products, orders, and logistics.
      </Typography>

      <Typography as="h2" variant="heading2" style={{ marginTop: '20px' }}>
        Section Title
      </Typography>

      <Typography variant="body2" style={{ marginTop: '5px' }}>
        This is some body text with a smaller font size.
      </Typography>

      <Typography variant="caption" style={{ marginTop: '15px', display: 'block' }}>
        This is a caption. Useful for small notes or image captions.
      </Typography>

      <label htmlFor="someInput" style={{ marginTop: '15px', display: 'block' }}>
        <Typography as="span" variant="label">
          This is a label for an input field.
        </Typography>
      </label>

      <button style={{ marginTop: '20px', padding: '10px 15px' }}>
        <Typography variant="button" as="span">
          Click Me
        </Typography>
      </button>

      <Typography
        as="div"
        variant="body1"
        className="custom-class-example" // Example of a custom class
        onClick={() => alert('Typography clicked!')}
        style={{ marginTop: '20px', cursor: 'pointer', color: 'blue' }}
      >
        This is a clickable div with body1 variant and a custom class.
      </Typography>
    </div>
  )
}

export default App
