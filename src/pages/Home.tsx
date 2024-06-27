import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Provider } from 'react-native-paper';
import CategoryList from '../components/Category/CategoryList';
import { CategoryRepository } from '../../database/repositories/CategoryRepository';
import { CategoryEntity } from '../../database/entities/CategoryEntity';
import { CategoryItemProps } from '../types/Category';
import { useIsFocused } from '@react-navigation/native';
import FabButton from '../components/Button/FabButton';

type Props = {
  navigation: any;
};

function Home({ navigation }: Props) {
  const [categories, setCategories] = useState<CategoryItemProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const isFocused = useIsFocused(); // Add this line

  const fetchCategories = async () => {
    try {
      const categoryRepo = new CategoryRepository();
      const data: CategoryEntity[] = await categoryRepo.getAllCategories();
      console.log({ data });

      const transformedData: CategoryItemProps[] = data.map(category => ({
        id: category.id,
        icon: category.icon || '',
        name: category.name,
      }));

      setCategories(transformedData);
    } catch (error) {
      console.error('Error fetching categories: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchCategories(); // Fetch categories again when the screen is focused
    }
  }, [isFocused]);

  if (loading) {
    return (
      <View style={styles.view}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handleFabNavigate = (page: string, id: number) => {
    navigation.navigate(page, { id: id });
  };

  return (
    <Provider>
      <View style={styles.view}>
        <CategoryList data={categories} />
        <FabButton
          setPress={handleFabNavigate}
          isOpen={open}
          setIsOpen={setOpen}
        />
      </View>
    </Provider>
  );
}

export default Home;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
