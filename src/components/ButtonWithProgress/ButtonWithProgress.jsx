import React, { useState, useEffect } from 'react'
import { Button, makeStyles } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles({
  wrapper: {
    position: 'relative',
    display: 'inline-block'
  },
  buttonProgress: {
    position: 'absolute',
    top: '24%',
    left: '38%'
  }
})

export default function ButtonWithProgress(props) {
  const [loading, setLoading] = useState(false)

  const {
    variant,
    color,
    type,
    size,
    className,
    disabled,
    onClick,
    text,
    isLoading
  } = props
  const classes = useStyles()

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])

  return (
    <div className={classes.wrapper}>
      <Button
        variant={variant}
        color={color}
        type={type}
        size={size}
        className={className}
        disabled={disabled || loading}
        onClick={onClick}
      >
        {text}
      </Button>
      {loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  )
}
