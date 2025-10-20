import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductoService, Producto } from '../producto.service';

@Component({
  selector: 'app-producto-list',
  imports: [CommonModule],
  templateUrl: './producto-list.html',
  styleUrl: './producto-list.css'
})
export class ProductoList implements OnInit {
  productos: Producto[] = [];

  constructor(private productoService: ProductoService, private router: Router) {}

  ngOnInit(): void {
    this.loadProductos();
  }

  loadProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (data) => this.productos = data,
      error: (error) => console.error('Error loading productos:', error)
    });
  }

  editProducto(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  deleteProducto(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      this.productoService.deleteProducto(id).subscribe({
        next: () => this.loadProductos(),
        error: (error) => console.error('Error deleting producto:', error)
      });
    }
  }

  createProducto(): void {
    this.router.navigate(['/create']);
  }
}
