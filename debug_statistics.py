#!/usr/bin/env python3
"""
Debug Script for Statistical Features
Test each statistic individually to find problematic values
"""

import numpy as np
import pandas as pd
from sklearn.decomposition import PCA
import warnings
warnings.filterwarnings('ignore')

def load_data():
    """Load the dataset and statistical files"""
    print("📊 Loading data for debugging...")
    
    try:
        # Load main dataset
        df = pd.read_parquet("de_train.parquet")
        print(f"  ✓ Main dataset: {df.shape}")
        
        # Identify gene columns
        metadata_cols = ['cell_type', 'sm_name', 'sm_lincs_id', 'SMILES', 'control']
        gene_columns = [col for col in df.columns if col not in metadata_cols]
        print(f"  ✓ Gene columns: {len(gene_columns)}")
        
        # Load statistical files
        cell_stats = pd.read_csv("gene_de_stats_by_cell_type.csv")
        sm_stats = pd.read_csv("gene_de_stats_by_sm_name.csv")
        print(f"  ✓ Cell stats: {cell_stats.shape}")
        print(f"  ✓ SM stats: {sm_stats.shape}")
        
        return df, gene_columns, cell_stats, sm_stats
        
    except Exception as e:
        print(f"  ✗ Error loading data: {e}")
        return None, None, None, None

def analyze_statistical_columns(cell_stats, sm_stats):
    """Analyze each statistical column for problematic values"""
    print("\n🔍 ANALYZING STATISTICAL COLUMNS")
    print("=" * 60)
    
    # Get available statistical columns (exclude non-numeric ones)
    exclude_cols = ['gene', 'cell_type', 'sm_name']
    
    cell_stat_cols = [col for col in cell_stats.columns if col not in exclude_cols]
    sm_stat_cols = [col for col in sm_stats.columns if col not in exclude_cols]
    
    print(f"Cell stats columns: {cell_stat_cols}")
    print(f"SM stats columns: {sm_stat_cols}")
    
    # Analyze each column
    print(f"\n📊 CELL STATISTICS ANALYSIS:")
    print("-" * 40)
    
    for col in cell_stat_cols:
        values = cell_stats[col]
        
        # Count problematic values
        n_nan = values.isna().sum()
        n_inf_pos = np.isinf(values).sum() if values.dtype in ['float64', 'float32'] else 0
        n_inf_neg = np.isneginf(values).sum() if values.dtype in ['float64', 'float32'] else 0
        n_zero = (values == 0).sum()
        n_total = len(values)
        
        # Basic statistics
        try:
            mean_val = values.mean()
            std_val = values.std()
            min_val = values.min()
            max_val = values.max()
        except:
            mean_val = std_val = min_val = max_val = "ERROR"
        
        print(f"  📈 {col}:")
        print(f"      Total values: {n_total}")
        print(f"      NaN: {n_nan} ({n_nan/n_total*100:.2f}%)")
        print(f"      +Inf: {n_inf_pos} ({n_inf_pos/n_total*100:.2f}%)")
        print(f"      -Inf: {n_inf_neg} ({n_inf_neg/n_total*100:.2f}%)")
        print(f"      Zeros: {n_zero} ({n_zero/n_total*100:.2f}%)")
        print(f"      Range: [{min_val}, {max_val}]")
        print(f"      Mean±Std: {mean_val:.4f}±{std_val:.4f}")
        
        # Flag problematic
        if n_nan > 0 or n_inf_pos > 0 or n_inf_neg > 0:
            print(f"      🚨 PROBLEMATIC: Contains NaN/Inf values!")
        else:
            print(f"      ✅ Clean")
        print()
    
    print(f"📊 SMALL MOLECULE STATISTICS ANALYSIS:")
    print("-" * 40)
    
    for col in sm_stat_cols:
        values = sm_stats[col]
        
        # Count problematic values
        n_nan = values.isna().sum()
        n_inf_pos = np.isinf(values).sum() if values.dtype in ['float64', 'float32'] else 0
        n_inf_neg = np.isneginf(values).sum() if values.dtype in ['float64', 'float32'] else 0
        n_zero = (values == 0).sum()
        n_total = len(values)
        
        # Basic statistics
        try:
            mean_val = values.mean()
            std_val = values.std()
            min_val = values.min()
            max_val = values.max()
        except:
            mean_val = std_val = min_val = max_val = "ERROR"
        
        print(f"  📈 {col}:")
        print(f"      Total values: {n_total}")
        print(f"      NaN: {n_nan} ({n_nan/n_total*100:.2f}%)")
        print(f"      +Inf: {n_inf_pos} ({n_inf_pos/n_total*100:.2f}%)")
        print(f"      -Inf: {n_inf_neg} ({n_inf_neg/n_total*100:.2f}%)")
        print(f"      Zeros: {n_zero} ({n_zero/n_total*100:.2f}%)")
        print(f"      Range: [{min_val}, {max_val}]")
        print(f"      Mean±Std: {mean_val:.4f}±{std_val:.4f}")
        
        # Flag problematic
        if n_nan > 0 or n_inf_pos > 0 or n_inf_neg > 0:
            print(f"      🚨 PROBLEMATIC: Contains NaN/Inf values!")
        else:
            print(f"      ✅ Clean")
        print()

def test_individual_statistics(df, gene_columns, cell_stats, sm_stats):
    """Test each statistic individually with PCA"""
    print("\n🧪 TESTING INDIVIDUAL STATISTICS WITH PCA")
    print("=" * 60)
    
    # Get available statistical columns
    exclude_cols = ['gene', 'cell_type', 'sm_name'] 
    available_stats = [col for col in cell_stats.columns if col not in exclude_cols]
    
    print(f"Available statistics: {available_stats}")
    
    # Test each statistic individually
    results = {}
    
    for stat in available_stats:
        print(f"\n🔬 Testing: {stat}")
        print("-" * 30)
        
        try:
            # Extract vectors for this statistic only
            stat_vectors = []
            
            for idx, row in df.iterrows():
                cell_type = row['cell_type']
                sm_name = row['sm_name']
                
                # Cell type statistic
                cell_stat_vector = cell_stats[
                    cell_stats['cell_type'] == cell_type
                ].set_index('gene')[stat].reindex(gene_columns, fill_value=0.0).values
                
                # Small molecule statistic
                sm_stat_vector = sm_stats[
                    sm_stats['sm_name'] == sm_name
                ].set_index('gene')[stat].reindex(gene_columns, fill_value=0.0).values
                
                stat_vectors.append([cell_stat_vector, sm_stat_vector])
            
            # Convert to numpy arrays
            cell_vectors = np.array([sv[0] for sv in stat_vectors], dtype=np.float32)
            sm_vectors = np.array([sv[1] for sv in stat_vectors], dtype=np.float32)
            
            print(f"   Cell vectors shape: {cell_vectors.shape}")
            print(f"   SM vectors shape: {sm_vectors.shape}")
            
            # Check for problematic values before cleaning
            cell_nan_count = np.isnan(cell_vectors).sum()
            cell_inf_count = np.isinf(cell_vectors).sum()
            sm_nan_count = np.isnan(sm_vectors).sum()
            sm_inf_count = np.isinf(sm_vectors).sum()
            
            print(f"   Before cleaning - Cell NaN: {cell_nan_count}, Inf: {cell_inf_count}")
            print(f"   Before cleaning - SM NaN: {sm_nan_count}, Inf: {sm_inf_count}")
            
            # Clean data
            cell_vectors_clean = np.nan_to_num(cell_vectors, nan=0.0, posinf=0.0, neginf=0.0)
            sm_vectors_clean = np.nan_to_num(sm_vectors, nan=0.0, posinf=0.0, neginf=0.0)
            
            # Check after cleaning
            cell_nan_count_after = np.isnan(cell_vectors_clean).sum()
            cell_inf_count_after = np.isinf(cell_vectors_clean).sum()
            sm_nan_count_after = np.isnan(sm_vectors_clean).sum()
            sm_inf_count_after = np.isinf(sm_vectors_clean).sum()
            
            print(f"   After cleaning - Cell NaN: {cell_nan_count_after}, Inf: {cell_inf_count_after}")
            print(f"   After cleaning - SM NaN: {sm_nan_count_after}, Inf: {sm_inf_count_after}")
            
            # Test PCA on each
            pca = PCA(n_components=min(128, cell_vectors_clean.shape[0]-1, cell_vectors_clean.shape[1]))
            
            # Test cell vectors
            try:
                cell_pca = pca.fit_transform(cell_vectors_clean)
                cell_pca_success = True
                cell_pca_shape = cell_pca.shape
                cell_explained_var = pca.explained_variance_ratio_.sum()
            except Exception as e:
                cell_pca_success = False
                cell_pca_shape = "FAILED"
                cell_explained_var = 0
                print(f"     ❌ Cell PCA failed: {e}")
            
            # Test SM vectors
            try:
                sm_pca = pca.fit_transform(sm_vectors_clean) 
                sm_pca_success = True
                sm_pca_shape = sm_pca.shape
                sm_explained_var = pca.explained_variance_ratio_.sum()
            except Exception as e:
                sm_pca_success = False
                sm_pca_shape = "FAILED"
                sm_explained_var = 0
                print(f"     ❌ SM PCA failed: {e}")
            
            # Store results
            results[stat] = {
                'cell_pca_success': cell_pca_success,
                'sm_pca_success': sm_pca_success,
                'cell_pca_shape': cell_pca_shape,
                'sm_pca_shape': sm_pca_shape,
                'cell_explained_var': cell_explained_var,
                'sm_explained_var': sm_explained_var,
                'cell_problematic_before': cell_nan_count + cell_inf_count,
                'sm_problematic_before': sm_nan_count + sm_inf_count,
                'overall_success': cell_pca_success and sm_pca_success
            }
            
            if results[stat]['overall_success']:
                print(f"   ✅ SUCCESS: PCA worked for both cell and SM vectors")
                print(f"      Cell PCA: {cell_pca_shape}, explained var: {cell_explained_var:.4f}")
                print(f"      SM PCA: {sm_pca_shape}, explained var: {sm_explained_var:.4f}")
            else:
                print(f"   ❌ FAILED: PCA failed for one or both vector types")
                
        except Exception as e:
            print(f"   💥 CRITICAL ERROR: {e}")
            results[stat] = {
                'overall_success': False,
                'error': str(e)
            }
    
    return results

def test_safe_combinations(results):
    """Test combinations of safe statistics"""
    print("\n🛡️ SAFE STATISTICS COMBINATIONS")
    print("=" * 60)
    
    # Find safe statistics
    safe_stats = [stat for stat, result in results.items() if result.get('overall_success', False)]
    problematic_stats = [stat for stat, result in results.items() if not result.get('overall_success', False)]
    
    print(f"✅ Safe statistics: {safe_stats}")
    print(f"❌ Problematic statistics: {problematic_stats}")
    
    # Suggest combinations
    if len(safe_stats) >= 2:
        print(f"\n💡 Recommended feature sets:")
        print(f"   Basic (safe): {safe_stats[:2]}")
        if len(safe_stats) >= 4:
            print(f"   Extended (safe): {safe_stats[:4]}")
        print(f"   All safe: {safe_stats}")
    else:
        print(f"\n⚠️ Only {len(safe_stats)} safe statistics found!")
        print(f"   May need to use only: {safe_stats}")

def main():
    """Main debugging function"""
    print("🚨 STATISTICAL FEATURES DEBUGGER")
    print("=" * 80)
    print("This script will identify problematic statistical features")
    print("-" * 80)
    
    # Load data
    df, gene_columns, cell_stats, sm_stats = load_data()
    
    if df is None:
        print("❌ Failed to load data")
        return
    
    # Analyze statistical columns
    analyze_statistical_columns(cell_stats, sm_stats)
    
    # Test individual statistics
    results = test_individual_statistics(df, gene_columns, cell_stats, sm_stats)
    
    # Show summary
    print("\n📋 SUMMARY OF RESULTS")
    print("=" * 60)
    
    for stat, result in results.items():
        if result.get('overall_success', False):
            print(f"✅ {stat:10s}: SAFE (Cell:{result['cell_explained_var']:.3f}, SM:{result['sm_explained_var']:.3f})")
        else:
            error_msg = result.get('error', 'PCA failed')
            print(f"❌ {stat:10s}: PROBLEMATIC ({error_msg})")
    
    # Suggest safe combinations
    test_safe_combinations(results)
    
    print("\n🎯 RECOMMENDATIONS:")
    print("-" * 40)
    print("1. Use only the SAFE statistics in your experiments")
    print("2. Avoid the PROBLEMATIC ones until data is cleaned")
    print("3. Update your statistical_features mapping accordingly")
    
    print("\n✅ Debugging complete!")

if __name__ == "__main__":
    main()
