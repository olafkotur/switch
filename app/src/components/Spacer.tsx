import React from 'react'

interface Props {
  vertical?: number
  horizontal?: number
}

export const Spacer = ({ vertical, horizontal }: Props) => {
  const styles: React.CSSProperties = {}
  if (vertical) {
    styles.marginTop = vertical
    styles.marginBottom = vertical
  }
  if (horizontal) {
    styles.marginLeft = horizontal
    styles.marginRight = horizontal
  }
  return <div style={styles} />
}
