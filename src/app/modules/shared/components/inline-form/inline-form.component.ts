import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InputTypes } from '@enums/input-types.enum';
import { InlineForm } from '@interfaces/inline-form.interface';

@Component({
    selector: 'app-inline-form',
    templateUrl: './inline-form.component.html',
    styleUrls: ['./inline-form.component.scss'],
})
export class InlineFormComponent {
    @Input() title: string = '';
    @Input() defaultText: string = 'Not defined';
    @Input() hasButton: boolean = false;
    @Input() buttonText: string = 'Submit';
    @Input() inputPlaceholder: string = '';
    @Input() inputType: string = InputTypes.INPUT;

    @Output() handleSubmit = new EventEmitter<string>();

    isEditing: boolean = false;
    InputTypes = InputTypes;
    form: FormGroup<InlineForm> = this.fb.group({
        title: [''],
    });

    constructor(private fb: FormBuilder) {}

    activeEditing(): void {
        if (this.title) {
            this.form.patchValue({ title: this.title });
        }

        this.isEditing = true;
    }

    onSubmit(): void {
        if (this.form.value.title) {
            this.handleSubmit.emit(this.form.value.title);
        }

        this.isEditing = false;
        this.form.reset();
    }

    cancelEditing(): void {
        this.isEditing = false;
    }
}
