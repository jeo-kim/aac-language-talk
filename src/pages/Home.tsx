// src/screens/Home.tsx
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import CategoryList from '../components/Category/CategoryList';
import { CategoryRepository } from '../../database/repositories/CategoryRepository';
import { CategoryEntity } from '../../database/entities/CategoryEntity';
import { CategoryItemProps } from '../types/Category';

type Props = {};

function Home({}: Props) {
  const [categories, setCategories] = useState<CategoryItemProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryRepo = new CategoryRepository();
        const data: CategoryEntity[] = await categoryRepo.getAllCategories();
        console.log({ data });

        const transformedData: CategoryItemProps[] = data.map(category => ({
          uid: category.id,
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

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <View style={styles.view}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.view}>
      <CategoryList data={categories} />
    </View>
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
