import { getInitials } from '../../utils/helpers'

interface AvatarProps {
  name: string
  color: string | undefined
  size?: number
  radius?: number
}

export default function Avatar({ name, color = "#aa00ff", size = 32, radius = 8 }: AvatarProps) {
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: radius,
      background: hexToRgba(color, 0.15),
      border: `1px solid ${hexToRgba(color, 0.3)}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: size * 0.35,
      fontWeight: 600,
      color,
      flexShrink: 0,
    }}>
      {getInitials(name)}
    </div>
  )
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}
