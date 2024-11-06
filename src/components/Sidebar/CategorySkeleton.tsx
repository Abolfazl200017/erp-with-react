import { Box, Skeleton } from "@mui/material";

function CategorySkeleton() {
  return (
    <Box sx={{ width: 1, mt: 3, px: 2, py: 3 }}>
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} variant="rounded" height={40} sx={{ marginBottom: '15px' }} />
      ))}
    </Box>
  );
}

export default CategorySkeleton;