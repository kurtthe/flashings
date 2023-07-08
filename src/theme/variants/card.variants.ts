const cardVariants = {
  defaults: {
    // We can define defaults for the variant here.
    // This will be applied after the defaults passed to createVariant and before the variant defined below.
    /* Cross platform styles */
    backgroundColor: 'cards',
    borderRadius: 'm',
    shadowColor: 'shadow',
    px: 'xl',
    py: 'l',
    my: 's',
    /* iOS only */
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 16,
    shadowOpacity: 0.12,
    /* Android only */
    elevation: 16,
  },
};

export default cardVariants;
