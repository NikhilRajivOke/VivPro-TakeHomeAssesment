import { useState } from "react";

export const usePagination = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const handlePaginationChange = (paginationModel) => {
    setPage(paginationModel.page);
    setPageSize(paginationModel.pageSize);
  };

  return { page, pageSize, handlePaginationChange };
};
