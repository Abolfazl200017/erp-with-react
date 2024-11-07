import { Box, Skeleton, useTheme } from "@mui/material"

function TableSkeleton() {
    const theme = useTheme()

    return (
        <Box sx={{ width: 1, border: 1, borderColor: theme.palette.grey[600], borderRadius: 1 }}>
        <Box sx={{ backgroundColor: theme.palette.background.default, width: 1, height: 52, p: 1 }}>
          <Skeleton sx={{ width: 1, height: 1 }} />
        </Box>
        {Array.from({ length: 5 }, (_, i) => i + 1).map((key) => (
          <Box
            key={key}
            sx={{
              width: 1,
              height: 52,
              backgroundColor: theme.palette.darkCardBG.main,
              p: 1,
              borderTop: 1,
              borderColor: theme.palette.grey[600],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Skeleton sx={{ width: 1 / 5, height: 1 }} />
            <Skeleton sx={{ width: 1 / 5, height: 1 }} />
            <Skeleton sx={{ width: 2 / 5, height: 1 }} />
          </Box>
        ))}
      </Box>
    )
}

export default TableSkeleton