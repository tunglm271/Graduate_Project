import { Skeleton, Stack } from '@mui/material';

export default function ParagraphSkeleton() {
  return (
    <Stack spacing={1}>
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="text" width="85%" />
      <Skeleton variant="text" width="95%" />
      <Skeleton variant="text" width="70%" />
    </Stack>
  );
}
