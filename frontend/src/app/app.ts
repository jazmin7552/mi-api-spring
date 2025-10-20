import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Producto {
  id?: number;
  nombre: string;
  precio: number;
  descripcion: string;
  categoria: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  productos: Producto[] = [];
  producto: Producto = { nombre: '', precio: 0, descripcion: '', categoria: '' };
  isEditMode: boolean = false;
  nextId: number = 1;

  // Crear o actualizar producto
  onSubmit() {
    if (this.isEditMode) {
      const index = this.productos.findIndex(p => p.id === this.producto.id);
      if (index !== -1) this.productos[index] = { ...this.producto };
      this.isEditMode = false;
    } else {
      this.producto.id = this.nextId++;
      this.productos.push({ ...this.producto });
    }
    this.resetForm();
  }

  createProducto() {
    this.isEditMode = false;
    this.resetForm();
  }

  editProducto(id: number) {
    const prod = this.productos.find(p => p.id === id);
    if (prod) {
      this.producto = { ...prod };
      this.isEditMode = true;
    }
  }

  deleteProducto(id: number) {
    this.productos = this.productos.filter(p => p.id !== id);
  }

  cancel() {
    this.isEditMode = false;
    this.resetForm();
  }

  resetForm() {
    this.producto = { nombre: '', precio: 0, descripcion: '', categoria: '' };
  }
}
