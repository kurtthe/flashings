import React from 'react';
import { HeaderBox, Icon } from '@ui/components';
import { SearchIcon } from '@assets/icons';
import JobsListContainer from '@features/jobs/containers/JobsList';

const AllJobsScreens = () => {
  return (
    <>
      <HeaderBox rightIcon={<Icon as={SearchIcon} />} title="All Jobs" />
      <JobsListContainer />
    </>
  );
};
export default AllJobsScreens;
