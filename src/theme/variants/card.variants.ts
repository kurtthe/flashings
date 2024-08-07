import { isTablet } from '@shared/platform';

const cardVariants = {
  defaults: {
    padding: isTablet ? 'l' : 'm',
    marginBottom: 'm',
    marginHorizontal: 'm',
    backgroundColor: 'white',
    borderRadius: 's',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
    shadowColor: 'lightGray',
  },

  guide: {
    width: 200,
    padding: 's',
    backgroundColor: 'lightGray2',
    marginBottom: 'unset',
    marginHorizontal: 'unset',
    borderRadius: 'unset',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    borderWidth: 0.2,
    borderColor: 'black',
  },
  updates: {
    padding: isTablet ? 'xl' : 'm',
    backgroundColor: 'base25',
    shadowOpacity: 1,
    shadowRadius: 8,
    shadowColor: 'black',
  },
};

export default cardVariants;
