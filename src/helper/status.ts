export const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Not yet aired':
        return {backgroundColor: '#FFC107', textColor: '#000'};
      case 'Currently Airing':
        return {backgroundColor: '#4CAF50', textColor: '#FFF'};
      case 'Finished Airing':
        return {backgroundColor: '#2196F3', textColor: '#FFF'};
      default:
        return {backgroundColor: '#9E9E9E', textColor: '#FFF'};
    }
  };