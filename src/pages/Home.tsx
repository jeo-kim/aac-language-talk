import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { FAB, Portal, Provider } from 'react-native-paper';
import CategoryList from '../components/Category/CategoryList';
import { CategoryRepository } from '../../database/repositories/CategoryRepository';
import { CategoryEntity } from '../../database/entities/CategoryEntity';
import { CategoryItemProps } from '../types/Category';
import { useIsFocused } from '@react-navigation/native';

type Props = {
  navigation: any;
};

function Home({ navigation }: Props) {
  const [categories, setCategories] = useState<CategoryItemProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
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

  const handleCategoryAdd = () => {
    navigation.navigate('AddCategory');
  };

  const handleCardAdd = () => {
    navigation.navigate('AddCard');
  };

  return (
    <Provider>
      <View style={styles.view}>
        <CategoryList data={categories} />
        <Portal>
          <FAB.Group
            open={open}
            icon={open ? 'close' : 'plus'}
            visible={true}
            actions={[
              {
                icon: 'plus',
                label: '카테고리 추가',
                onPress: handleCategoryAdd,
              },
              {
                icon: 'pencil',
                label: '카테고리 수정',
                onPress: () => console.log('카테고리 수정'),
              },
              {
                icon: 'plus',
                label: '카드 추가',
                onPress: handleCardAdd,
              },
            ]}
            onStateChange={({ open }) => setOpen(open)}
            onPress={() => {
              if (open) {
                // Do something if the speed dial is open
              }
            }}
          />
        </Portal>
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
