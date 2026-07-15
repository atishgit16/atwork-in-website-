import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'

// Animated gradient icon placeholder (replace with your own SVG or MUI icon)
const ServiceIcon = ({ children }) => (
  <Box
    sx={{
      width: 64,
      height: 64,
      borderRadius: '16px',
      background: 'linear-gradient(135deg, #00f2fe 0%, #ff0844 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '2rem',
      color: 'white',
      boxShadow: '0 8px 20px rgba(0,242,254,0.3)',
      marginBottom: '1.5rem',
    }}
  >
    {children}
  </Box>
)

export default function ServiceCard({ title, description, icon, tags = [] }) {
  return (
    <Card
      sx={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '24px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-4px) scale(1.02)',
          boxShadow: '0 25px 40px -12px rgba(0,242,254,0.25)',
          borderColor: 'rgba(0,242,254,0.4)',
          background: 'rgba(255,255,255,0.07)',
        },
        padding: '2rem',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Icon */}
      <ServiceIcon>{icon || '💻'}</ServiceIcon>

      <CardContent sx={{ padding: 0, flexGrow: 1 }}>
        {/* Title */}
        <Typography
          variant="h5"
          component="h3"
          sx={{
            fontWeight: 700,
            color: 'white',
            marginBottom: 1.5,
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{
            color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.6,
            marginBottom: 2,
          }}
        >
          {description}
        </Typography>

        {/* Tags/Chips (optional) */}
        {tags && tags.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginTop: 'auto' }}>
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  background: 'rgba(255,255,255,0.06)',
                  color: 'rgba(255,255,255,0.8)',
                  borderColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                }}
              />
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  )
}